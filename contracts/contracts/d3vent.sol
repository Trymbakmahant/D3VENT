// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import {ByteHasher} from "./helpers/ByteHasher.sol";
import {IWorldID} from "./interfaces/IWorldID.sol";

contract d3vent {
    event CreatedEvent(uint indexed eventId, uint indexed eventDate, string indexed eventName);
    event Withdrawal(uint indexed eventId, address indexed organiser, uint balance);
    event JoinableSet(uint indexed eventId, bool isJoinable);
    event NewOrganiser(uint indexed eventId, address newOrganiser);
    event AdminAdded(address indexed newAdmin, address indexed addedBy);
    event AdminDeleted(address indexed deletedAdmin, address indexed deletedBy);

    event UserVerified(address indexed user);
    event EventPlaybackUriUpdated(uint indexed eventId, string playbackUri);
    event EventSuperfluidIndexIdUpdated(uint indexed eventId, uint sfIndexId);

    using ByteHasher for bytes;

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();
 
    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The World ID group ID (always 1)
    //uint256 internal immutable groupId = 1;
    uint256 public groupId = 1;

    /// @dev worldcoin action id used in verifyAndExecute
    string public actionId = "wid_staging_034a32eef8f9c2d4ac2cca30890c2e76";

    
    
    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    
    uint public eventIds;
    uint public immutable withdrawalBuffer;
    uint public adminsCount;
    

    struct event_ {
        uint id;
        string name;
        string description;
        address organiser;
        string uri;
        string playbackUri;
        uint dateTime;
        uint duration;
        //uint price;
        //uint128 capacity;
        uint128 numJoined;      
        bool isJoinable;
        uint withdrawalDate;
        uint sfIndexId;
    }

    event_[] events;

    mapping(address => bool) public isVerified; // user address => bool
    mapping(uint => mapping(address => bool)) public isJoined;    // eventId => user address => isJoined
    mapping(address => uint[]) public userEventIds; //user address => event ids
    mapping(uint => mapping(address => uint)) public joinerBalances;   // eventId => user address => balance
    mapping(address => uint[]) public organiserEventIds; // organiser address => event ids
    mapping(uint => uint) public eventBalances;    // eventId => event balance
    mapping(address => bool) public isAdmin;   // admin address to bool

    constructor (uint _withdrawalBuffer, IWorldID _worldId) {
        require(_worldId != IWorldID(address(0)), "zero address is invalid");
        isAdmin[msg.sender] = true;
        adminsCount = 1;
        worldId = _worldId;
        withdrawalBuffer = _withdrawalBuffer;
    }


    /// @dev selfdestruct
    function kill() external onlyAdmins {
        selfdestruct(payable(msg.sender));
    }


    /// @dev verify the proof and set the user's wallet address as a verified person if successful
    function verifyAndExecute(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        // First, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            abi.encodePacked(actionId).hashToField(),
            proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;

        // Finally, execute your logic here, for example issue a token, NFT, etc...
        // Make sure to emit some kind of event afterwards!
        isVerified[signal] = true;
        emit UserVerified(signal);
    }

    
    /// @dev enforce only an event's organiser allowed
    modifier onlyOrganiser (uint _id) {
        require(msg.sender == events[_id].organiser, "only organiser");
        _;
    }


    /// @dev enforce only contract administrators allowed
    modifier onlyAdmins {
        require(isAdmin[msg.sender], "only admins");
        _;
    }


    /// @dev add a contract administrator
    function addAdmin(address _newAdmin) external onlyAdmins {
        ++adminsCount;
        isAdmin[_newAdmin] = true;
        emit AdminAdded(_newAdmin, msg.sender);
    }


    /// @dev delete a contract administrator. there must be at least one admin
    function deleteAdmin(address _newAdmin) external onlyAdmins {
        require(adminsCount > 1, "can't delete last admin");
        --adminsCount;
        isAdmin[_newAdmin] = false;
    }

    
    /// @dev to allow the worldcoin action id to be changed
    function setActionId(string calldata _actionId) external onlyAdmins {
        actionId = _actionId;
    }
    

    /// @dev joined/joinable currently being used as an event isLive/watching flag
    function isEventJoined(uint _id) external view returns(bool) {
        return isJoined[_id][msg.sender];
    }

    /// @dev create a new event. msg.sender is organiser
    function createEvent(
        string calldata _name,
        string calldata _description,
        string calldata _uri,
        string calldata _playbackUri,
        uint _dateTime,
        uint _duration,
        bool _isJoinable
        ) external {
        require(_dateTime > block.timestamp, "date/time in past");

        event_ memory newEvent;
        
        newEvent.organiser = msg.sender;
        newEvent.id = eventIds++;
        newEvent.name = _name;
        newEvent.uri = _uri;
        newEvent.playbackUri = _playbackUri;
        newEvent.dateTime = _dateTime;
        newEvent.duration = _duration;
        newEvent.isJoinable = _isJoinable;
        newEvent.description = _description;

        organiserEventIds[msg.sender].push(newEvent.id);

        events.push(newEvent);
        emit CreatedEvent(newEvent.id, newEvent.dateTime, newEvent.name);
    }

    /// @dev allow an event's organiser to be changed
    function setOrganiser(uint _id, address _newOrganiser) external onlyOrganiser(_id) {
        require(_newOrganiser != address(0), "invalid: zero address");
        require(_id <= eventIds, "invalid event id");
        events[_id].organiser = _newOrganiser;
        emit NewOrganiser(_id, _newOrganiser);
    }


    /// @dev isJoinable being used as an event isLive flag
    function setEventIsJoinable(uint _id, bool _isJoinable) external onlyOrganiser(_id) {
        //require(! events[_id].isJoinable, "already joinable");    // used for differnt purpose now
        events[_id].isJoinable = _isJoinable;
        emit JoinableSet(_id, _isJoinable);
    }


    /// @dev joined is being used as an isWatching flag
    function joinEvent(uint _id) external {
        require(_id <= eventIds, "invalid event id");
        require(! isJoined[_id][msg.sender], "already joined");  // keep this check as it keeps a running total

        ++events[_id].numJoined;
        isJoined[_id][msg.sender] = true;
        userEventIds[msg.sender].push(_id);
        //eventBalances[_id] = msg.value;   // ticket price no longer in use as using superfluid
    }
    

    /// @dev anyone can view all event details    
    function getEvent(uint _id) external view returns (event_ memory) {
        require(_id <= eventIds, "invalid event id");
        return events[_id];
    }

    /// @dev returns the whole events array
    function getAllEvents() external view returns (event_[] memory) {
        return events;
    }


    /// @dev returns array of created event ids for organiser address
    function getOrganiserEventIds(address _organiser) external view returns(uint[] memory) {
        return organiserEventIds[_organiser];
    }


    /// @dev returns array of joined event ids for user address
    function getUserEventIds(address _user) external view returns(uint[] memory) {
        return userEventIds[_user];
    }


    /// @dev sets the playbackUri element of the event object
    function setEventPlaybackUri(uint _id, string calldata _playbackUri) external onlyOrganiser(_id) {
        require(_id < events.length, "invalid event id");
        events[_id].playbackUri = _playbackUri;
        emit EventPlaybackUriUpdated(_id, _playbackUri);
    }


    /// @dev gets the sfIndexId element of the event object
    function getSfIndexId(uint _id) external view returns (uint) {
        require(_id < events.length, "invalid event id");
        return events[_id].sfIndexId;
    }


    /// @dev sets the sfIndexId element of the event object
    function setSfIndexId(uint _id, uint _sfIndexId) external onlyOrganiser(_id) {
        require(_id < events.length, "invalid event id");
        events[_id].sfIndexId = _sfIndexId;
        emit EventSuperfluidIndexIdUpdated(_id, _sfIndexId);
    }


    //@dev event organiser can withdraw event balance
    function organiserWithdrawal(uint _id) external onlyOrganiser(_id) {
        require(block.timestamp >= events[_id].withdrawalDate + withdrawalBuffer, "withdrawal not allowed yet");
        
        uint _balance = eventBalances[_id];
        eventBalances[_id] = 0;
        (bool success, ) = msg.sender.call{value: _balance}("");
        require(success, "withdrawal failed");
        emit Withdrawal(_id, msg.sender, _balance);
    }
}