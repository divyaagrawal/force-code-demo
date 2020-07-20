@RestResource(urlMapping='/Api/EquifaxCreditValidation')
global with sharing class EquifaxCreditValidation {    
    
  /*  
    @HttpPost
    global static SubmitCreditValidationResponse equifaxCreditValidationMethod(SubmitCreditValidationRequest submitCreditValidationRequest) {
        
        //Creating Response
        SubmitCreditValidationResponse response = new SubmitCreditValidationResponse();
         System_API_Logs__c systemAPILog = new System_API_Logs__c();
        
        //Fetching Request Inputs
        CreditPerson cp = submitCreditValidationRequest.creditDetails;
        
        Account acc = new Account();
        Contact con = new Contact();
        
        response = validateRequest(cp);
        system.debug('@@responseCode'+response);
        response.auditId = cp.auditId;
        
        if(response.responseCode == 601){
            response.responseCode = 601;
            response.responseStatus = 'Invalid Request parameters';
        }else if(response.responseCode == 400){
            response.responseCode = 400;
            response.responseStatus = 'Bad Request';
            
        }
        else if(!(cp.auditId).isNumeric()){
                response.responseCode = 503;
            	response.responseStatus = 'Audit ID must have numbers only';
        }       
        else if(!String.isBlank(cp.programId) && (cp.programId).length() > 6){
                response.responseCode = 504;
            	response.responseStatus = 'Program Id length should not be greater than 6';
        } 
        else if(!String.isBlank(cp.auditId) && (cp.auditId).length() > 10){
                response.responseCode = 501;
            	response.responseStatus = 'Audit Id length should not be greater than 10';
        }
        
        else if(response.responseCode == 200){
            Savepoint sp = Database.setSavepoint();
            try{   
                
                acc.configId__c = cp.configId;
                acc.Name = cp.auditId;
                acc.auditId__c = Decimal.valueof(cp.auditId);
                acc.programId__c = cp.programId;
                insert acc;
                system.debug('Account Info--->'+acc);
                                
                con.AccountId = acc.Id;
                con.Audit_ID__c = Decimal.valueof(cp.auditId);
                con.FirstName = cp.firstName;
                con.LastName = cp.lastName;
                con.Birthdate = cp.dob;
                con.MailingStreet = cp.address1 + '' + cp.address2;
                con.MailingCity = cp.city;
                con.MailingState = cp.state;
                con.MailingPostalCode = cp.postalCode;
                con.MailingCountry = cp.country;
                insert con;
                system.debug('Contact Info--->'+con);
                
                response.responseCode = 200;
                
            }catch(Exception e){
                Database.rollback(sp);

                response.responseCode = 400;
                response.responseStatus = 'Bad Request';
                system.debug('Equifax Credit Validation :: '+e.getStackTraceString());
                system.debug('Error Message :'+e.getMessage());
                
                if(e.getMessage().contains('DUPLICATE_VALUE')){
                    response.responseCode = 502;
                	response.responseStatus = 'Duplicate audit Id found'; 
                }
                
                systemAPILog.Error_Details__c = e.getMessage();
                
            }
            
            try{
                //Means Account and contact insterted successfully and the responsecode = 200
                if(response.responseCode ==  200){
                    
                    List<Account> accountListForQueue = [Select Id from Account Where Id =:acc.Id];
                    
                    List<Id> accountIds = new List<Id>();
                    
                    for(Account ac:accountListForQueue){
                        accountIds.add(ac.Id);
                    }
                    
                    if(!accountListForQueue.isEmpty()){
                        system.debug('Initiate Enqueue Job');
                        System.enqueueJob(new BC_ConsumerCreditReviewQueueable(accountIds));
                        
                    }
                    
                    response.responseStatus = 'Success';
                    response.responseCode =  200;
                }
                
            }catch(Exception e){
                
                response.responseCode = 501;
                response.responseStatus = 'Equifax is down';
                system.debug('Equifax Credit Validation :: '+e.getStackTraceString()+' :: '+e.getMessage());
                systemAPILog.Error_Details__c = e.getMessage();
                
            }   
        }
        
        systemAPILog.Response_Details__c = String.valueOf(response);
        systemAPILog.API_Service_Name__c = 'EquifaxCreditValidation';
        systemAPILog.Request_Info__c = String.valueOf(submitCreditValidationRequest);
        
        if(response.responseCode == 200){
            systemAPILog.Status__c = 'Success';
            systemAPILog.Account__c = acc.Id;
            systemAPILog.Contact__c = con.Id;
            systemAPILog.Had_Errors__c = false;
        }else{
            systemAPILog.Status__c = 'Execution Error';
            systemAPILog.Had_Errors__c = true;
            if(String.isBlank(systemAPILog.Error_Details__c)){
                systemAPILog.Error_Details__c = response.responseStatus;
            }
               
        }
        insert systemAPILog;
        return response;
    }   
 
    
    
    public static SubmitCreditValidationResponse validateRequest(CreditPerson cp){
        
        SubmitCreditValidationResponse response = new SubmitCreditValidationResponse();
        
        try{               
            system.debug('CreditPerson Request --->'+cp);
            
            if(String.isBlank(cp.configId)){
                response.responseCode = StaticConstants.RESPONSE_CODE_INVALID_REQUEST_PARAMETERS;
            }
            
            else if( String.isBlank(cp.auditId) ){
                response.responseCode = StaticConstants.RESPONSE_CODE_INVALID_REQUEST_PARAMETERS;
            }
            
            else if(String.isBlank(cp.programId)){
                response.responseCode = StaticConstants.RESPONSE_CODE_INVALID_REQUEST_PARAMETERS;
            }
            
            else if(String.isBlank(cp.firstName)){
               response.responseCode = StaticConstants.RESPONSE_CODE_INVALID_REQUEST_PARAMETERS;
            }
            
            else if(String.isBlank(cp.lastName)){
                response.responseCode = StaticConstants.RESPONSE_CODE_INVALID_REQUEST_PARAMETERS;
            }
            
            else if(String.isBlank(String.valueof(cp.dob))){
                response.responseCode = StaticConstants.RESPONSE_CODE_INVALID_REQUEST_PARAMETERS;
            }
            
            else if(String.isBlank(cp.address1)){
                response.responseCode = StaticConstants.RESPONSE_CODE_INVALID_REQUEST_PARAMETERS;
            }
            
            else if(String.isBlank(cp.city)){
                response.responseCode = StaticConstants.RESPONSE_CODE_INVALID_REQUEST_PARAMETERS;
            }
            
            else if(String.isBlank(cp.state)){
                response.responseCode = StaticConstants.RESPONSE_CODE_INVALID_REQUEST_PARAMETERS;
            }
            
            else if(String.isBlank(cp.postalCode)){
                response.responseCode = StaticConstants.RESPONSE_CODE_INVALID_REQUEST_PARAMETERS;
            }
            
            else if(String.isBlank(cp.country)){
                response.responseCode = StaticConstants.RESPONSE_CODE_INVALID_REQUEST_PARAMETERS;
            }
            else{
                response.responseCode = 200;
            }
            
        }catch(Exception e){
            response.responseCode = 400; 
            system.debug('Equifax Credit Validation :: '+e.getStackTraceString()+' :: '+e.getMessage());
            
        }
        return response;
    }

    */
    
    global class SubmitCreditValidationRequest { 
        webservice  CreditPerson creditDetails;
    }
    
    global class CreditPerson{
        webservice  string configId;
        webservice  string auditId;
        webservice  string programId;
        webservice  string firstName;
        webservice  string lastName;
        webservice  Date dob;
        webservice  string address1;
        webservice  string address2;
        webservice  string city;
        webservice  string state;
        webservice  string postalCode;
        webservice  string country;
        
    }
    
    global class SubmitCreditValidationResponse {
        webservice  String auditId;
        webservice  string responseStatus;             
        webservice  Integer responseCode;
    }
    
    
    
}