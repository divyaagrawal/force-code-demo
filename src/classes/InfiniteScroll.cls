public class InfiniteScroll {
    @AuraEnabled
    public static List<Contact> getBooksByAllCategories(){
        
        List<Contact> categeroy = [SELECT Id, LastName, FirstName, Salutation, Name FROM Contact];
        return categeroy;
    } 
    
    @AuraEnabled
    public static List<Contact> getBooksCategories(){
        List<Contact> contactList = [SELECT Id, LastName, FirstName, Salutation, Name FROM Contact];
        return contactList;
    }
    @AuraEnabled
    public static List<Contact> getBooks(Integer limits , Integer offsets){
        System.debug('limits'+limits);
        System.debug('offsets'+offsets);
        Integer intlimits = integer.valueof(limits);
        Integer intoffsets = integer.valueof(offsets);
        
        List<Contact> books = [SELECT Id, LastName, FirstName, Salutation, Name FROM Contact Order by Name Limit :intlimits Offset :intoffsets];
        return books;
    } 
    
   /* @AuraEnabled
    public static void setBookStatus(String status , List<Books__c> books){
        System.debug('--'+status);
        System.debug('--books --'+books);
        for(Books__c b :books){
            b.publish_status__c = status ;
        }
        
        update books;
    } */
    
    @AuraEnabled
    public static Integer getTotalCount(){
        AggregateResult results = [select  count(Id) total  from Contact ];
        Integer total =(Integer)results.get('total') ; 
        return total;
    } 
    @AuraEnabled
    public static void deleteBooks(String ids ){
        Delete [Select id from Contact where  id=:ids];
    } 
    
    
}