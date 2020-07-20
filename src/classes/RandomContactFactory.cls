public class RandomContactFactory {
    
    public static List<Contact> generateRandomContacts(Integer num,String lname){
        
        List<Contact> accts = new List<Contact>();
        
        for(Integer i=0;i<num;i++) {
            Contact a = new Contact(FirstName =lname+' ' + i);
            accts.add(a);
        }
        return accts;
        
    }

}