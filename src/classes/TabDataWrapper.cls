public class TabDataWrapper {
    @AuraEnabled public List<TabPathHeaderWrapper> pathHeader {get;set;}
  
    
    // Global variables for all the screens ...
    @AuraEnabled public Opportunity opportunityObj {get;set;}
    
    // page parameters ...
    @AuraEnabled public String recordId {get;set;}
    

    // Screen specific variables ...
    @AuraEnabled public GettingStartedObject gettingStartedObj {get;set;}
    @AuraEnabled public AccountDetails accountDetails {get;set;}
    
    // For GettingStarted screen ...
    public class GettingStartedObject{        
        @AuraEnabled public String name {get;set;}
        @AuraEnabled public double amount {get;set;}
    }
    
    // For GettingStarted screen ...
    public class AccountDetails{        
        @AuraEnabled public String name {get;set;}
    }
    
    public class TabPathHeaderWrapper{
        @AuraEnabled public String stageName {get;set;}
        @AuraEnabled public Boolean isComplete {get;set;}
        @AuraEnabled public Boolean isVisible {get;Set;}
        
        public TabPathHeaderWrapper(String stageName, Boolean isComplete, Boolean isVisible){
            this.stageName = stageName;
            this.isComplete = isComplete;
            this.isVisible  = isVisible;
        }
    }
}