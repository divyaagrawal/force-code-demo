public class ParseHubEquifaxServiceResponse {

	public List<CreditScoreResList> creditScoreResList;

	public class CreditScoreResList {
		public String auditId;
		public String returnCode;
		public String returnMsg;
		public String transactionID;
	}
    

	public static ParseHubEquifaxServiceResponse parse(String json) {
		return (ParseHubEquifaxServiceResponse) System.JSON.deserialize(json, ParseHubEquifaxServiceResponse.class);
	}
    
    
    Public static void parseResponse(String requestBody, HTTPResponse response){
     /*   
        System_API_Logs__c systemAPILog = new System_API_Logs__c();
        List<String> accountIds = new List<String>();
        List<Account> accountList = new List<Account>();
        String responseBody = response.getBody();
        
        try{
            system.debug('requestBody :: '+requestBody);
        	system.debug('response'+response);
        	system.debug('response body'+response.getBody());
            
            
            ParseHubEquifaxServiceResponse parseEquifax = parse(responseBody);
            List<CreditScoreResList> creditList = parseEquifax.creditScoreResList;
            
            for(CreditScoreResList creditScore: creditList){
                accountIds.add(creditScore.transactionID);
            }
            
            Map<ID, Account> accountMap = new Map<ID, Account>([Select Id,Equifax_Status__c, Hub_Equifax_Service_Status__c from Account where Id =: accountIds and Hub_Equifax_Service_Status__c != 'In Sync']);
            
            for(CreditScoreResList creditScore: creditList)
            {
                Account account = accountMap.get(creditScore.transactionID);
                if(creditScore.returnCode == '0'){
                    account.Hub_Equifax_Service_Status__c = 'In Sync';
                }else if(creditScore.returnCode == '1'){
                   account.Hub_Equifax_Service_Status__c = 'Error while sending'; 
                    if(String.isBlank(systemAPILog.Error_Details__c)){
                        systemAPILog.Error_Details__c = creditScore.returnMsg;
                    }
                }else if(creditScore.returnCode == '2'){
                   account.Hub_Equifax_Service_Status__c = 'Data Not Found';
                   systemAPILog.Error_Details__c = creditScore.returnMsg;
                }
                
                accountList.add(account);
            }
            
            update accountList;
            
            system.debug('@@systemAPILog.Error_Details__c'+ systemAPILog.Error_Details__c);
            if(String.isNotBlank(systemAPILog.Error_Details__c)){
                //Means error occured for any account
               systemAPILog.Status__c = 'Execution Error';
               systemAPILog.Had_Errors__c = true;
            }else{
                systemAPILog.Status__c = 'Success';
               systemAPILog.Had_Errors__c = false;
            }
            
        }catch(Exception e){
            systemAPILog.Status__c = 'Exception';   
            systemAPILog.Had_Errors__c = true;
            systemAPILog.Error_Details__c = e.getStackTraceString()+' :: '+e.getMessage();
            system.debug('EFX Consumer Report Exception :: '+e.getStackTraceString()+' :: '+e.getMessage());
            
        }
        
        // Maintaining the system api log
        systemAPILog.Response_Details__c = response.getBody();
        systemAPILog.Request_Info__c = requestBody;  
        systemAPILog.API_Service_Name__c = 'HubEquifaxService';
        
        
        insert systemAPILog;

*/
        
    }
    
    
    
}