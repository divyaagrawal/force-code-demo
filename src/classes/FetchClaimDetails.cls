public with sharing class FetchClaimDetails {

  @InvocableMethod(label='Fetch Claim')
  public static List<String> fetchClaim(List<String> claimNumber) {

    system.debug('@@Case Number '+ claimNumber);
     
    String claimNum = claimNumber[0];
      
    system.debug('@@Case Number at 0'+ claimNum);
    List<String> statusList = new List<String>();

    // Get the list of new and scheduled appointments
    List<Case> caseList = [SELECT Id,Status FROM Case WHERE CaseNumber =:claimNum];
    system.debug('@@caseList'+ caseList);
      
      if(caseList != null & caseList.size() > 0){
          statusList.add(caseList[0].Status);
      }else{
         statusList.add('@@Case not exist with claim number '+ claimNum); 
      }
	
      system.debug('@@SstatusList'+ statusList);
   
    return statusList;
  }
}