global class IntentController {
    // public static String message;
    public Case caseValue {get;set;}
    
    
    global static void fetchIntent(Id caseId){
        List<Case> caseList = [Select Id, Description,Intent__c, IntentList__c  from case where id =:caseId];
        if(caseList != null && caseList.size() >0){
            //String model = 'YWZJSULWN26NN3LJ2BYNKM4T5E';
            String model = 'P3SCC6XFOZMMHK25T77OG3NLUE';
        	//String text = 'how is my package being shipped?';
        	String text = caseList[0].Description;
        	EinsteinIntent.getIntent(model,text,caseId);
        	//system.debug('probabilities :: '+probabilities);
        }
    }
    
    
    
    global static void saveCaseItemOwn(List<Case> case1) {
        try{
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
        if (!System.isBatch()){
            EinsteinIntentController.sentimentOwn(message, '2ELVAO5BNVGZLBHMYTV7CGD5AY' ,message , email , phone , name ,caseid);
        }
        
    }
    
    
    
}