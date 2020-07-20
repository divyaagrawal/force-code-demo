public class AccountListController {

 
    @AuraEnabled 
    public static List<Account> getAccounts(){
        
        List<Account> accountList = [select Id, Name from Account limit 10];
        return accountList;
      
    }
    
   
    
    
}