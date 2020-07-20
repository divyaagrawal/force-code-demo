public class OpportunityTriggerHandler {
    public static void afterUpdate(List<Opportunity> newList,Map<Id, Opportunity> oldMap){
        Set<Id> oppId = new Set<Id>();
        for(Opportunity opp:newList){
            if(opp.Custom_Status__c.equalsIgnoreCase('Reset') && opp.Custom_Status__c != oldMap.get(opp.Id).Custom_Status__c){
                 oppId.add(opp.Id);  
            }
        }
        List<OpportunityLineItem> oppProList = new List<OpportunityLineItem>([select id from OpportunityLineItem where OpportunityId in:oppId]);
        delete oppProList;
        
    }
}