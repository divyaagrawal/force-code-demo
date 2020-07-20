@isTest
private class HubServiceSchedulableTest
{
    /*
    @testSetup static void setup() {
        EquifaxCreditValidation.SubmitCreditValidationRequest submitCredit = new EquifaxCreditValidation.SubmitCreditValidationRequest();
        
        EquifaxCreditValidation.CreditPerson cp = new EquifaxCreditValidation.CreditPerson();
        cp.configId = '34354';
        cp.auditId = '34354477';
        cp.programId = '343522';
        cp.firstName = 'firstName';
        cp.lastName = 'lastName';
        cp.dob = system.today()- 250;
        cp.address1 = 'address1';
        cp.address2 = 'address2';
        cp.city = 'Alpharetta';
        cp.state = 'GA';
        cp.postalCode = '30004';
        cp.country = 'US';
        
        submitCredit.creditDetails = cp;
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.auditId = '34354322';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.auditId = '31154322';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);


        
    }
    
    
    static testmethod void schedulerTest() 
    {  
        Test.setMock(HttpCalloutMock.class, new HubEquifaxTestMock());
        String CRON_EXP = '0 0 0 15 3 ? *';
        
        Test.startTest();
        
        String jobId = System.schedule('ScheduleApexClassTest',  CRON_EXP, new HubServiceSchedulable());
        CronTrigger ct = [SELECT Id, CronExpression, TimesTriggered, NextFireTime FROM CronTrigger WHERE id = :jobId];
        system.assert(ct != null);
        Test.stopTest(); 
    }
    
    static testmethod void testHubServiceScheduleConfig(){
        Test.setMock(HttpCalloutMock.class, new HubEquifaxTestMock());
        Integer frequency = integer.ValueOf(Label.HubServiceScheduleFrequency);
        Integer totalIterations = 60/frequency;
        Test.startTest();
        HubServiceScheduleConfig hubServiceSchedule = new HubServiceScheduleConfig();
        List<String> joIds =hubServiceSchedule.ScheduletheHubServiceJob();    
        system.assertEquals(joIds.size(), totalIterations);    
        Test.stopTest();
              
        
    }
    
    static testmethod void testHubServiceBatch(){
        Test.setMock(HttpCalloutMock.class, new HubEquifaxTestMock());
         List<Account> accountList = [Select Id from Account where Hub_Equifax_Service_Status__c IN ('No-Hit','Ready to send','Error while sending') ];
      	if(accountList != null && accountList.size() > 0){
            System.debug('Running batch class for the accountList Size '+accountList.size());
           Id batchJobId = Database.executeBatch(new HubEquifaxServiceBatch(), 10);
       }
        
    }
    
    static testmethod void testDataRecordsHubServiceBatch(){
        Test.setMock(HttpCalloutMock.class, new HubEquifaxTestMock());
        String requestString = 'Success Data Records';
         System.enqueueJob(new HubEquifaxServiceQueueable(requestString));  
        
    }
    
    static testmethod void testDataRecordHubServiceBatch(){
        Test.setMock(HttpCalloutMock.class, new HubEquifaxTestMock());
        String requestString = 'Success Data Record';
         System.enqueueJob(new HubEquifaxServiceQueueable(requestString));  
        
    }
    
 
    */
}