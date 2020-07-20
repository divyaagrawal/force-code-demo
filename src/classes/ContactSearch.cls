public class ContactSearch{
    public static Contact[] searchForContacts(String lastName, String pin){
     Contact[] cts = [SELECT Id, Name FROM Contact 
                 WHERE lastName =:lastName AND MailingPostalCode =:pin];
                 return cts;
    
    }



}