trigger AcoountChildCount on Account (After Insert,After delete,After update, after undelete) {
    Account[] lstAccounts;
    if (Trigger.isDelete) {
        lstAccounts = Trigger.old;
    }
    else if(Trigger.isUpdate){
        lstAccounts = Trigger.new; 
        lstAccounts = Trigger.old;  
    }else{
        lstAccounts = Trigger.new; 
    }
    
    Set<Id> parentId = new Set<Id>();
  
    //Method 1
    List<Account> parentAccountList = new List<Account>();
        List<Account> parentAccountListUpdated = new List<Account>();

    
    for(Account acc:lstAccounts){
    Account parentAccount = [SELECT parent.Number_of_Contacts__c, parentId FROM Account where Id =: acc.id];
    //for (Account acc : [select parentId, Number_of_Contacts__c from Account where Id in lstAccounts]) {
        parentAccountList.add(parentAccount);
    
    
    }
    
    for(Account parentAcc: parentAccountList){
        List<Account> childAccount = [Select Id from Account where id =: parentAcc.parentId];
        parentAcc.Number_of_Contacts__c = childAccount.size();
        parentAccountListUpdated.add(parentAcc);

    }
    
    
    //Method 2
    /*
    for (Account acc : lstAccounts) {
        Id parentId = [SELECT parentId FROM Account where Id =: acc.id];
        if(parentId != null){
           Account parentAccount = [SELECT Number_of_Contacts__c FROM Account where Id =: parentId];
             if (Trigger.isDelete){
                    parentAccount.Number_of_Contacts__c -= 1;
            }else{
                    parentAccount.Number_of_Contacts__c += 1;
            } 
                    parentAccountList.add(parentAccount);

        }
        
    }

*/
    update parentAccountListUpdated;
}