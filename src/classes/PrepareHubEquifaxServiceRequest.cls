public class PrepareHubEquifaxServiceRequest {
    
    
    private static final String ARRAY_PAYLOAD = '\'{\' "creditScoreList" : [ {0} ] }';
    
    public static final String CREDIT_SCORE_TO_PAYLOAD = '\'{\' "configID" : "{0}", "auditID" : "{1}", "programID" : "{2}", "firstName" : "{3}", "lastName" : "{4}", "dob" : "{5}", "address" : \'{\'"address1": "{6}", "address2": "{7}", "city": "{8}", "state": "{9}", "zip5": "{10}"}, "equifaxKeyPoint" : "{11}", "status" : "{12}", "transactionID" : "{13}", "errorCode" : "{14}", "errorDesc" : "{15}" }';
    
 /*   
    public static string initiateHubEquifax(List<Account> scope){
        
        Set<Id> accountIds = new Set<Id>();
        Map<Id,Contact> accContactMap = new Map<Id,Contact>();
        for(Account acc:scope){
            accountIds.add(acc.Id);
        }
        
        List<Contact> contactList =  [Select Id, account.Id,Account.configId__c, Account.auditid__c, Account.programId__c, Account.Equifax_Status__c,Account.Hub_Service_Error_Description__c, Firstname, Lastname, MailingStreet, MailingCity, MailingState, 
                                      MailingPostalCode, BirthDate From Contact Where accountId =:accountIds];
        
        Integer FICOscore, Vantagescore;
        String CreditStatus;
        string requestString = '';
        
        List<String> creditScoreList = new List<String>();
        
        system.debug('calling Equifax Consumer Report');
        
        try{
            for(Contact con: contactList){
                system.debug('##acctid initiateCreditReview in '+con.account.Id);
                
                FICOscore = getBeaconScore(con.account.Id);
                system.debug('##FICOscore '+FICOscore);
                
                Vantagescore = null;
                Vantagescore = getVantageScore(con.account.Id);
                system.debug('##Vantagescore '+Vantagescore);
                
                String equifaxKeyPointValue = 'FICO';
                
                //If Vantagescore is less than 620 and FICO is greater than 620 then the equifaxKeyPoint would be VANTAGE otherwise FICO
                if(Vantagescore < 620 &&  FICOscore >= 620){
                    equifaxKeyPointValue = 'VANTAGE';
                }
                
                String configID = con.Account.configId__c;
                String auditID = String.valueof(con.Account.auditid__c);                
                String programID = con.Account.programId__c; 
                String firstName = con.FirstName;  
                String lastName = con.LastName;  
                String dob = String.valueof(con.BirthDate);  
                String address1 = con.MailingStreet;
                String address2 = '';
                String city = con.MailingCity;
                String state = con.MailingState;
                String zip5 = con.MailingPostalCode;
                String equifaxKeyPoint = equifaxKeyPointValue; 
                String status = con.Account.Equifax_Status__c;
                String transactionID = con.Account.Id;  
                String errorCode = '';  
                String errorDesc = '';
                
                if(status == null || !status.equalsIgnoreCase('Yes')){
                    status = 'NO';
                    errorCode = 'EQ2010';  
                    errorDesc = 'invalid customer';
                } 
                
                if(Vantagescore > 620 &&  FICOscore > 620){
                     errorCode = '1002';  
                     errorDesc = 'FICO/Vantage > 620';
                }
                
                if(con.Account.Hub_Service_Error_Description__c == 'No-Hit'){
                    errorCode = '1002';  
                    errorDesc = 'No-Hit';
                }
                
                String toPayload = String.format(CREDIT_SCORE_TO_PAYLOAD, new String[] {configID, auditID, programID, firstName, lastName, dob, address1, address2,city, state, zip5, equifaxKeyPoint, status, transactionID, errorCode, errorDesc });
                system.debug('toPayload--->'+toPayload);
                
                creditScoreList.add(toPayload);
                system.debug('creditScoreDetailsPayloads--->'+creditScoreList);
            }
            
            requestString =  String.format(PrepareHubEquifaxServiceRequest.ARRAY_PAYLOAD, new String[] { String.join(creditScoreList, ',') } );
            system.debug(requestString);
            
        }catch(Exception e){
            system.debug('Exception :: '+e.getStackTraceString());
            system.debug('Exception Line No :: '+e.getLineNumber());
            system.debug('Exception Line No :: '+e.getMessage());
        }
        return requestString;
        
    } 
    
    
    
    public static Integer getBeaconScore(Id accountId){
        
        List<forseva1__EquifaxConsumer__c> EFX_Consumer_ReportList = new List<forseva1__EquifaxConsumer__c>([SELECT Id, forseva1__Account__c, forseva1__eqScrBeacon__c
                                                                                                             FROM forseva1__EquifaxConsumer__c
                                                                                                             WHERE forseva1__Account__c =: accountId
                                                                                                             AND forseva1__Latest_Record__c = true
                                                                                                             ORDER BY LastModifiedDate LIMIT 1]);
        
        system.debug('EFX_Consumer_ReportList  ---> '+EFX_Consumer_ReportList);
        
        Integer Score;
        
        if(!EFX_Consumer_ReportList.isEmpty()){
            
            Score = Integer.valueof(EFX_Consumer_ReportList.get(0).forseva1__eqScrBeacon__c);
            
        }
        
        return Score;
        
    }
    
    
    public static Integer getVantageScore(Id accountId){
        
        List<forseva1__EquifaxConsumer__c> EFX_Consumer_ReportList = new List<forseva1__EquifaxConsumer__c>([SELECT Id, forseva1__Account__c, Vantage_Score__c
                                                                                                             FROM forseva1__EquifaxConsumer__c
                                                                                                             WHERE forseva1__Account__c =: accountId
                                                                                                             AND forseva1__Latest_Record__c = true
                                                                                                             ORDER BY LastModifiedDate LIMIT 1]);
        
        system.debug('EFX_Consumer_ReportList  ---> '+EFX_Consumer_ReportList);
        
        Integer Score;
        
        if(!EFX_Consumer_ReportList.isEmpty()){
            
            Score = Integer.valueof(EFX_Consumer_ReportList.get(0).Vantage_Score__c);
            
        }
        
        return Score;
        
    }

*/
    
}