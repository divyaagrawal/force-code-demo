/*
@Name            : RelatedList
@CreatedDate     : 12-07-2018
@CreatedBy       : Divya Agrawal
@Description     : This controller is used for showing the Related Records.
@Lightning Comp  : N/A
@VF Component    : N/A
@Process Builder : N/A 
@VF Page         : N/A 
*/
public with sharing class RelatedList{
    
    
    // For getting the list data ...
    @AuraEnabled
    public static String getList(String recId, String sObjectName){
        String returnString = '';
        try{
            system.debug('###---recId---'+ recId);
            system.debug('###---sObjectName---'+ sObjectName);
            if(String.isNotBlank(recId) && String.isNotBlank(sObjectName)){
                if(sObjectName.equalsIgnoreCase('Opportunity')){
                    returnString = JSON.serialize(fetchOpportunityList(recId));
                }else if(sObjectName.equalsIgnoreCase('Contact')){
                    returnString = JSON.serialize(fetchContactList(recId));
                }
            }
        }Catch(Exception exp){
            throw new AuraHandledException('Error :'+ exp.getMessage());
        }
        return returnString;
    }
    
    // For fetching the Opportunity List...
    private static List<Opportunity> fetchOpportunityList(String recId){
        List<Opportunity> opportunityList = new  List<Opportunity>();
        try{
            opportunityList = [select id, Name, Amount, StageName from Opportunity where AccountId = :recId ];
        }Catch(Exception exp){
            system.debug(exp.getMessage());
            throw new AuraHandledException('Error :'+ exp.getMessage());
        }
        return opportunityList;    
    }
    
    // For fetching the Contact List...
    private static List<Contact> fetchContactList(String recId){
        system.debug('In fetchContactList recId '+recId);
        List<Contact> contactList = new  List<Contact>();
        try{
            
            contactList = [select id, Name, Email, Phone from Contact where AccountId = :recId ];
            system.debug('contact list successfully fetched size '+contactList.size() );
            
        }Catch(Exception exp){
            system.debug(exp.getMessage());
            throw new AuraHandledException('Error :'+ exp.getMessage());
        }
        return contactList;   
    }
}