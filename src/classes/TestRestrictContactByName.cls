@isTest public class TestRestrictContactByName {
    @isTest static void check(){
        
        Contact c = new Contact();
        c.LastName = 'rashi';
        insert c;
        
         Contact c1 = new Contact();
        c1.LastName = 'INVALIDNAME';
        insert c1;
        
        
        
    }
    
}