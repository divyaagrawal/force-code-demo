trigger ass4_opportunity_updateCloseDate on Opportunity (before update, after update) {
for(Opportunity opp: Trigger.new){
if(opp.StageName.equalsIgnoreCase('Closed Won') || opp.StageName.equalsIgnoreCase('Closed Lost'))
opp.CloseDate = System.today();
}
    if(Trigger.isAfter && Trigger.isUpdate){
        OpportunityTriggerHandler.afterUpdate(Trigger.new, Trigger.oldMap);
    }
    
}