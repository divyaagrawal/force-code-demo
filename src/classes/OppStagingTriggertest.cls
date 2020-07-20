@isTest
public class OppStagingTriggertest{
    @isTest static void  OppStagingTriggertestMethod()
    {
        /*
        
        Plan__c planOb = new Plan__c();
planOb.name = '776992';
insert planOb;

Opportunity opp = new Opportunity();
opp.id = '1234';
opp.name = 'test';
opp.plan__c =  planOb.id;
opp.Opportunity_Status__c = 'New';
opp.recordtype.name = 'Rollover';
insert opp;

Opportunity_staging__c oppStaging = new Opportunity_staging__c();
oppStaging.Plan_Id__c = '776992';
oppStaging.SSN_Plan__c = 'test123';
oppStaging.Account_Balance__c = 104.00;
        
         Test.startTest();
        Database.SaveResult result = Database.insert(oppStaging);
        Test.stopTest();
        
        Opportunity opp1 = [Select id, at_Risk__c from Opportunity where id = '1234'];
        
        
        System.assert(104.00+'', opp1.at_Risk__c+'');
        
        
insert oppStaging;    
   
*/
}
  }