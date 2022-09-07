info

    create event test parameters
        "test event name","https://livepeer.org/123",1662994265,1000,1000000,false



todos and questions of what to do

     should we allow multiple organisers?
     should we allow an event wallet address so funds can be withdrawn to a non organiser address e.g. a multisig wallet?

    should users be required to verify POP before joining an event?

     setting up a voting mechanism where joiners can vote to call the event failed in some way 
     and so prevent the organiser withdrawal, and can claim back their funds
     a period up to which a joiner can unjoin and get a refund. after a certain point it's too late
     this should be expressed as a period before event start time. prevet organiser simply bringing the event forward and 
     being able rug pull / be sure prevent dirty tricks. e.g. make sure unjoining can't be shortened below a certain period
     need proof of personhood otherwise susceptible sybil attack from both sides

     add support for worldcoin plus another wallet

     access control to allow end user owner only. trustless or also admins. are there any organisational admins?

     should created events be immutable or setters for most things so they can be changed. what should be ammendable.
     if changes allowed, should have 1 setter function with all changeable settings, or setter for each
     organiser might reasonablely need ot change a event date or change a URI.
     change: organiser, multiple organisers, event name, uri, datetime, price capacity
     allow set different address as organiser at create time or able to change after
     create event: consider capacity of zero is unlimited or throw error?
     being able to change the event date does present possibilities of gaming the system and if allowed there should be restrictions
     if organiser change change dates, joiners should be allowed to unjoin and get their funds back.
     workflow questions: should newly created even have eventActive as param or always true/false
     should there be a way to cancel an event - how should that be represented
     should we have a cancelled / finished status

     create event organiser always msg.sender? setOrgnaiser function to change?
     should event have a closed/finished dateTime?
     should joiner address always be msg.sender or allow to join another address?
    
     don't think there's any need to zero out joiner balances after organiser withdrawal, but could add a flag for added safety
     would be too gassy iterating through a large number of joiners
     