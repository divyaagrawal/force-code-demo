global class SentimentControllerCls {
  // public static String message;
   public Case caseValue {get;set;}
    
  
global static void saveCaseItemOwn(List<Case> case1) {
       
 try{
          system.debug('case1 list'+case1);
     
            for(Case caseValue : case1) {
               
            System.debug('caseid '+caseValue.id);
                String message=caseValue.Description;
                String email =caseValue.SuppliedEmail;
                String phone= caseValue.SuppliedPhone;
                String name = caseValue.SuppliedName;
                
            getCallSentimentOwn(message , email , phone , name ,caseValue.id);
            
            } 
        }catch(Exception e){
            System.debug('Exception' +e);
}
    }
   public static void getCallSentimentOwn(String message , String email , String phone ,String name ,String caseid) {
       
               EinsteinMaster.sentimentOwn(message, 'CommunitySentiment' ,message , email , phone , name ,caseid);
        
      
    }
    
    
    
    
}