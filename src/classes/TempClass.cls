public class TempClass {

    public static List<Student__c> doThat(String classId){
        List<Student__c> studentList = new List<Student__c>();
        for(Student__c student:[select name from Student__c where Class__c =:classId]){
            studentList.add(student);
        }
        return studentList;
    }
    
     public static Map<Class__c,List<Student__c>> fetchStudentMap(){
        Map<Class__c,List<Student__c>> studentMap = new Map<Class__c,List<Student__c>>();
         List<Student__c> studentList;
         Class__c cls = new Class__C();
         
        for(Student__c student:[select Id, class__c from Student__c]){
            studentList = new List<Student__c>();
           cls.Id = student.class__c;
            if(studentMap.containsKey(cls)){
                studentList = studentMap.get(cls);
                studentList.add(student);
            }else{
                studentList.add(student);
                studentMap.put(cls, studentList);
            }
        }
        return studentMap;
    }
    
     public static String doUpdateAccount(String contactId){
       List<Account> accountList = new List<Account>();
       for(Contact contact:[SELECT Account.name,accountId, Account.ContactIds__c FROM Contact where id=:contactId])
       {
          Account account = new Account();
           if(contact.account.ContactIds__c != null){
               if(!contact.account.ContactIds__c.contains(contactId)){
                   account.ContactIds__c = contact.account.ContactIds__c + ','+ contactId;
               		account.id = contact.AccountId;
                   accountList.add(account);
               }
           }else{
               for(Account acc: [select id,(select id from contacts),ContactIds__c from Account where id=:contact.accountId]){
                  for(Contact con : acc.contacts){
                     acc.ContactIds__c += ','+con.id;
                  }
                  accountList.add(acc);
               }
           }
       }
         System.debug(accountList);
         if(accountList.size()>0){
             update accountList;
         }
         return '1';
    }
    
    public static integer daystt() {
   return 1;
}
    
    
    
    public static List<String> sObjectList(){
      List<String> sObjList = new List<String>();
      List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();     
     for(Schema.SObjectType f : gd)
     {
        sObjList.add(f.getDescribe().getLabel());
     }  
    return    sObjList; 
    }
    
    
    
    
}