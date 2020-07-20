public class ContactTriggerHandler {
  public static void beforeInsertHandling(list<Account> accountList){
        List<Account> previousAccount = [select Id, AccountNum__c from Account order by createdDate Desc limit 1];
    }

}