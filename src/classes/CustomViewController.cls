public class CustomViewController {
    
    
    @AuraEnabled
    public static List<Account> getAccountList(String appOption) {
        Integer appOptionInt = integer.valueof(appOption);
        List<Account> accountList = [select Id, Name from Account limit :appOptionInt];
        system.debug('Account List'+accountList);
        return accountList;
        
    }
    
    
}