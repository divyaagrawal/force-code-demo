public class CaseTriggerHandler {
    
    public static void onAfterInsert(List<Case> caseList){
        for(Case c: caseList){
            IntentController.fetchIntent(c.Id);
        }
    }
    

    
}