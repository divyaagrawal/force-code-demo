@isTest
public class EquifaxCreditValidationTest {
    
    /*@TestSetup
    static void initData(){
        
        //Creating US Credit Policy
        forseva1__CreditPolicy__c us_cp = new forseva1__CreditPolicy__c(name = 'PASS', forseva1__Default_Policy__c = true, forseva1__First_Credit_Review_Product__c = 'test', forseva1__First_Prequalification_Product__c='test', forseva1__First_Verification_Product__c='test');
        insert us_cp;
        
        //Creating Accounts        
        List<Account>  aclist = new List<Account>();
        aclist.add(new Account(name = 'Cambridge', forseva1__Credit_Policy__c = us_cp.Id ));        
        insert aclist;
        
        List<Contact> contactList = new List<Contact>();
        contactList.add(new Contact(FirstName = 'PG1', LastName = 'Contact1', AccountId = aclist[0].Id,
                                    MailingStreet = 'test street',
                                    MailingCity = 'test City',
                                    MailingState = 'test State',
                                    MailingPostalCode = '12345',
                                    MailingCountry = 'USA'));
        insert contactList;
        
        //Creating US Credit Policy
        forseva1__EquifaxConsumer__c equiCustomer = new forseva1__EquifaxConsumer__c(forseva1__Contact__c = contactList[0].Id, forseva1__Account__c = aclist[0].Id, forseva1__Latest_Record__c = true);
        insert equiCustomer;
        
        
    }
    
    static testMethod void testEquifaxCreditValidation(){
        
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
        
    }
    
    
    static testMethod void negativeEquifaxCreditValidation(){
        
        EquifaxCreditValidation.SubmitCreditValidationRequest submitCredit = new EquifaxCreditValidation.SubmitCreditValidationRequest();
        
        EquifaxCreditValidation.CreditPerson cp = new EquifaxCreditValidation.CreditPerson();
        cp.configId = '';
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
        cp.configId = '76767'; 
        cp.auditId = '';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.auditId = '7878833';
        cp.programId = '';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.programId = '343522';
        cp.firstName = '';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.firstName = 'firstName';
        cp.lastName = '';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);

        cp.lastName = 'lastName';
        cp.dob = null;
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.dob = system.today()- 250;
        cp.address1 = '';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.address1 = 'address1';
        cp.address2 = '';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.address2 = 'Addr2';
        cp.city = '';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.city = 'Alpharetta';
        cp.state = '';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.state = 'GA';
        cp.postalCode = '';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.postalCode = '30004';
        cp.country = '';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        
        
    }
    
    static testMethod void negativeTestEquifaxCreditValidation(){
        
        EquifaxCreditValidation.SubmitCreditValidationRequest submitCredit = new EquifaxCreditValidation.SubmitCreditValidationRequest();
        
        EquifaxCreditValidation.CreditPerson cp = new EquifaxCreditValidation.CreditPerson();
        cp.configId = '767676';
        cp.auditId = 'test';
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
        
        cp.auditId = '767676';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.programId = '67676767676';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
        cp.programId = '343522';
        cp.auditId = '767676764334456';
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
        
    }
    
    
    
    static testMethod void exceptionEquifaxCreditValidation(){
        
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
        EquifaxCreditValidation.equifaxCreditValidationMethod(submitCredit);
    }
    
    */
}