trigger OpportunityTrigger on Opportunity (before insert) {

    system.debug('Hello');
}