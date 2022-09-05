    // todos and questions of what to do
    // setting up a voting mechanism where joiners can vote to call the event failed in some way 
    // and so prevent the organiser withdrawal, and can claim back their funds
    // a period up to which a joiner can unjoin and get a refund. after a certain point it's too late
    // this should be expressed as a period before event start time. prevet organiser simply bringing the event forward and 
    // being able rug pull / be sure prevent dirty tricks. e.g. make sure unjoining can't be shortened below a certain period
    // need proof of personhood otherwise susceptible sybil attack from both sides

    // add support for worldcoin plus another wallet

    // access control to allow end user owner only. trustless or also admins. are there any organisational admins?

    // should created events be immutable or setters for most things so they can be changed. what should be ammendable.
    // if changes allowed, should have 1 setter function with all changeable settings, or setter for each
    // organiser might reasonablely need ot change a event date or change a URI.
    // change: organiser, multiple organisers, event name, uri, datetime, price capacity
    // allow set different address as organiser at create time or able to change after
    // create event: consider capacity of zero is unlimited or throw error?
    // being able to change the event date does present possibilities of gaming the system and if allowed there should be restrictions
    // if organiser change change dates, joiners should be allowed to unjoin and get their funds back.
    // workflow questions: should newly created even have eventActive as param or always true/false
    // should there be a way to cancel an event - how should that be represented
    // should we have a cancelled / finished status

    // create event organiser always msg.sender? setOrgnaiser function to change?
    // should event have a closed/finished dateTime?
    // should joiner address always be msg.sender or allow to join another address?
    
    // don't think there's any need to zero out joiner balances after organiser withdrawal, but could add a flag for added safety
    // would be too gassy iterating through a large number of joiners
    // 
    
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract d3vent {
    event CreatedEvent(uint indexed eventId, uint indexed eventDate, string indexed eventName);
    event Withdrawal(uint indexed eventId, address indexed organiser, uint balance);
    event JoinableSet(uint indexed eventId, bool isJoinable);
       
    uint eventIds;
    uint immutable withdrawalBuffer;

    //uint immutable unjoinBuffer; // not implemented
    
    // not implemented
    // struct user {
    //     address userAddress;
    //     event_[] eventIds;  // do we need quick lookups and/or able to iterate eventIds?
    // }

    struct event_ {
        address organiser;
        uint id;
        string name;
        string uri;
        uint dateTime;
        uint price;
        uint128 capacity;
        uint128 numJoined;      
        bool isJoinable;
        uint withdrawalDate;
    }

    event_[] events;


    mapping(uint => mapping(address => bool)) isJoined;    // eventId => userAddr => isJoined
    mapping(uint => mapping(address => uint)) joinerBalances;   // eventId => userAddr => balance
    mapping(uint => uint) eventBalances;    // eventId => event balance
    mapping(address => bool) isAdmin;   // admin address to bool
    

    constructor (uint _withdrawalBuffer) {
        withdrawalBuffer = _withdrawalBuffer;
    }
    
    modifier isAuthorised (uint _eventId) {
        require(
            msg.sender == events[_eventId].organiser || 
            isAdmin[msg.sender], 
            "not authroised"
        );
        _;
    }

    // test parameters: "test event name","https://livepeer.org/123",1662994265,1000,1000000,false
    function createEvent(
        //string calldata _eventName,
        string calldata _name,
        string calldata _uri,
        uint _dateTime,
        uint _price,
        uint128 _capacity,
        bool _isJoinable
        ) external {              // public to allow internal calls for testing

        // sanity checks
        require(_dateTime > block.timestamp, "date/time in past");

        event_ memory newEvent;
        
        newEvent.organiser = msg.sender;
        newEvent.id = eventIds++;
        newEvent.name = _name;
        newEvent.uri = _uri;
        newEvent.dateTime = _dateTime;
        newEvent.price = _price;
        newEvent.capacity = _capacity;
        newEvent.isJoinable = _isJoinable;
    
        events.push(newEvent);
        emit CreatedEvent(newEvent.id, newEvent.dateTime, newEvent.name);
    }


    function setOrganiser(uint _eventId, address _newOrganiser) external {
        // sanity checks
        require(_newOrganiser != address(0), "invalid: zero address");
        require(_eventId <= eventIds, "invalid event id");
        events[_eventId].organiser = _newOrganiser;
        // emit event
    }


    function setEventIsJoinable(uint _id, bool _isJoinable) external {
        require(! events[_id].isJoinable, "already joinable");
        events[_id].isJoinable = _isJoinable;
        emit JoinableSet(_id, _isJoinable);
    }

    // @dev needs proof of personhood
    // support superfluid payments? how would that affect logic
    // 
    function joinEvent(uint _id) external payable {
        require(_id <= eventIds, "invalid event id");
        require(events[_id].isJoinable, "cant join at this time");
        require(msg.value == events[_id].price, "send event price");
        require(! isJoined[_id][msg.sender], "already joined");

        ++events[_id].numJoined;
        isJoined[_id][msg.sender] = true;
        eventBalances[_id] = msg.value;
    }
    

    // @dev anyone can view all event details    
    function getEvent(uint _id) external view returns (event_ memory) {
        require(_id <= eventIds, "invalid event id");
        return events[_id];
    }

    
    //@dev event organiser can withdraw event balance
    function organiserWithdrawal(uint _id) external {
        require(msg.sender == events[_id].organiser, "only organiser");
        require(block.timestamp >= events[_id].withdrawalDate + withdrawalBuffer, "withdrawal not allowed yet");
        
        uint _balance = eventBalances[_id];
        eventBalances[_id] = 0;
        (bool success, ) = msg.sender.call{value: _balance}("");
        require(success, "withdrawal failed");
        emit Withdrawal(_id, msg.sender, _balance);
    }
}
