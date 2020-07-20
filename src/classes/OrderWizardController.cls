global without sharing class OrderWizardController {
    
    @AuraEnabled
    public static List<Device__c> findDeviceList(String searchKey,Integer limits , Integer offsets) {
        
        List<Device__c> deviceList = new List<Device__c>();
        Integer intlimits = integer.valueof(limits);
        Integer intoffsets = integer.valueof(offsets);
        system.debug('searchKey ::'+searchKey);
        system.debug('Fetching record for limits :: '+limits + ' offsets '+offsets);
        
        try{
            String soql = 'SELECT Id, Name, Description__c, Level__c, Constant__c, Price__c FROM Device__c where id != Null';
            
            if(searchKey != NULL && string.isNotBlank(searchKey)){
                String searchText='\'%' + String.escapeSingleQuotes(searchKey.trim()) + '%\'';
            soql +=  ' and Description__c LIKE '+searchText;
            }
           
            deviceList = Database.query(soql + ' order by LastModifiedDate desc  Limit :intlimits Offset :intoffsets');
            system.debug('deviceList'+deviceList);
            
        }catch(Exception e){
            system.debug('Exception :: '+e.getMessage() + ' '+e.getStackTraceString());
        }
        
        system.debug('deviceList :: '+deviceList);
        return deviceList;
    }
    
    
    
}