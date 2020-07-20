public class DemoAcc {
    
    public static void getAccount(){
        List<Account> accountList = [SELECT Id, Name, Type, RecordTypeId, Active__c FROM Account limit 100];
        system.debug('@@accountList'+accountList);
        
        List<Job_Posting__c> jibList = [SELECT Id, LastModifiedById, Name, CreatedById, Position__c FROM Job_Posting__c];
                system.debug('@@jibList'+jibList);

            
    }

}