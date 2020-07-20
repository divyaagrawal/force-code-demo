global class HubEquifaxServiceBatch implements Database.Batchable<sObject>,Database.Stateful, Database.AllowsCallouts{
    
    public String Query;
    
    global Database.QueryLocator start(Database.BatchableContext BC){
        
        query='SELECT Id, Name, Hub_Equifax_Service_Status__c FROM Account WHERE Hub_Equifax_Service_Status__c IN (\'No-Hit\',\'Ready to send\',\'Error while sending\')';
        
        system.debug('query--->'+query);
        
        return Database.getQueryLocator(query);
        
    }
    
    
    global void execute(Database.BatchableContext BC, List<Account> scope){
        
        system.debug('@@Account Size::'+scope.size());
        
        system.debug('Inside HubEquifaxServiceBatch Batch execute method');
        
    /*    String requestString = PrepareHubEquifaxServiceRequest.initiateHubEquifax(scope);
        
        system.debug('requestString'+requestString);
        
        if(requestString != ''){            
            System.enqueueJob(new HubEquifaxServiceQueueable(requestString));             
        }
       */ 
    }
    
    
    global void finish(Database.BatchableContext BC){
        
        /*
        // Query the AsyncApexJob object to retrieve the current job's information.
        AsyncApexJob a = [SELECT Id, Status, NumberOfErrors, JobItemsProcessed, TotalJobItems, CreatedBy.Email FROM AsyncApexJob WHERE Id =:BC.getJobId()];
        // Send an email to the Apex job's submitter notifying of job completion.
        
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage(); 
        String[] toAddresses = new String[]{'kalpesh.bhirud@equifax.com'};
            mail.setToAddresses(toAddresses);
        mail.setReplyTo(toAddresses[0]);
        mail.setSenderDisplayName('Batch Apex Job Update');
        mail.setSubject('Hub Equifax Service Batch Update' + a.Status);
        mail.setPlainTextBody('The batch Apex job processed ' + a.TotalJobItems + ' batches with '+ a.NumberOfErrors + ' failures.');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        
        System.debug('HubEquifaxServiceBatch Mail Sent Successfully '+mail);
        */
        
    }
    
    
}