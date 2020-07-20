/*
* @Name	  : AuditDataController
* @Story 			  : -
* @Release 			  : -
* @Author             : Divya Agrawal
* @Version            : 1.0
* @Date 		      : 02/15/2019
* @Updated By 		  : Divya Agrawal
* @LightningComponent Ref : AuditData
* @VF Page			  : N/A
* @Test Class		  : AuditDataControllerTest
*/
global without sharing class AuditDataController {
    
    // Function to fetch changed data list filter by options, user, date & offset
    @AuraEnabled
    public static List<ChangedDataWrapper> getChangedList(String appOption,String selectedUser, String selectedDate,Integer limits , Integer offsets) {
        
        List<ChangedDataWrapper> changedDataList = new List<ChangedDataWrapper>();
        
        Integer intlimits = integer.valueof(limits);
        Integer intoffsets = integer.valueof(offsets);
        system.debug('appOption :: '+appOption);
        system.debug('Fetching record for limits :: '+limits + ' offsets '+offsets);
        system.debug('selectedUser :: '+selectedUser + ' selectedDate :: '+selectedDate);
        
        try{
            if(appOption.equalsIgnoreCase('Lightning')){
                String soql = 'SELECT MasterLabel, CreatedDate, CreatedBy.Name, LastModifiedDate, LastModifiedBy.Name, ApiVersion, Description,isDeleted,NamespacePrefix,Language FROM AuraDefinitionBundle where id != null ';
                
                if(String.isNotBlank(selectedUser)){
                    soql += ' and createdById = \'' + selectedUser + '\'';
                }
                if(String.isNotBlank(selectedDate)){
                    soql += ' and ( DAY_ONLY(createdDate) >= '+selectedDate +' Or DAY_ONLY(LastModifiedDate) >= '+selectedDate +') ';
                }      
                
                List<AuraDefinitionBundle> lightningDataList = Database.query(soql + ' order by LastModifiedDate desc  Limit :intlimits Offset :intoffsets');
                system.debug('lightningDataList :: '+lightningDataList.size());
                for(AuraDefinitionBundle data: lightningDataList){
                    ChangedDataWrapper changedData = new  ChangedDataWrapper();
                    
                    changedData.createdBy = data.CreatedBy.Name;
                    changedData.createdDate = data.CreatedDate;
                    changedData.label = data.MasterLabel;
                    //section
                    changedData.description = data.Description;
                    changedData.isDeleted = data.isDeleted;
                    changedData.lastModifiedBy = data.LastModifiedBy.Name;
                    changedData.lastModifiedDate = data.LastModifiedDate; 
                    changedData.apiVersion = data.ApiVersion;
                    changedData.nameSpace = data.NamespacePrefix;
                    changedData.language = data.Language;
                    //delegateUser
                    changedDataList.add(changedData);
                }
            }else{
                
                String soql = 'SELECT Id, Action, Section, CreatedDate,CreatedBy.Name, Display,ResponsibleNamespacePrefix,DelegateUser FROM SetupAuditTrail where id != null ';
                
                if(String.isNotBlank(selectedUser)){
                    soql += ' and createdById = \'' + selectedUser + '\'';
                }
                if(String.isNotBlank(selectedDate)){
                    soql += ' and DAY_ONLY(createdDate) >= '+selectedDate;
                }      
                
                List<SetupAuditTrail> auditDataList = Database.query(soql + ' order by createddate desc  Limit :intlimits Offset :intoffsets');
                
                system.debug('SetupAuditTrail :: '+auditDataList.size());
                for(SetupAuditTrail data: auditDataList){
                    ChangedDataWrapper changedData = new  ChangedDataWrapper();
                    changedData.createdBy = data.CreatedBy.Name;
                    changedData.createdDate = data.CreatedDate;
                    changedData.label = data.Action;
                    changedData.section = data.Section;
                    changedData.description = data.Display;
                    
                    if(data.Display.contains('elete')){
                        changedData.isDeleted = true; 
                    }else{
                        changedData.isDeleted = false;   
                    }
                    //lastModifiedBy
                    //lastModifiedDate
                    changedData.nameSpace = data.ResponsibleNamespacePrefix;
                    //language
                    changedData.DelegateUser = data.DelegateUser;
                    changedDataList.add(changedData);
                }
            }
            
        }catch(Exception e){
            system.debug('Exception :: '+e.getMessage() + ' '+e.getStackTraceString());
        }
        
        system.debug('changedDataList :: '+changedDataList);
        return changedDataList;
    }
   
    //Get active system admin users
    @AuraEnabled
    public static List<Map<String,String>> getUserList() {
        List<Map<String,String>> userList = new List<Map<String,String>>();
        try{
            for(User user: [SELECT Id, Username, Name FROM User where profile.name = 'System Administrator' and isActive = true]){
                userList.add(new Map<String, String>{'value' => user.Id+'', 'label' => user.Name});
            } 
            system.debug('size : '+ userList.size() + ' userList: '+userList );
        }catch(Exception e){
            system.debug('Exception :: '+e.getMessage() +' '+ e.getStackTraceString());
        }
        return userList;
    }
    
    //Wrapper to manage changed lightning components & audit trail data
    public class ChangedDataWrapper{
        
        @AuraEnabled public String createdBy {get;set;}
        @AuraEnabled public Datetime createdDate{get;set;}
        @AuraEnabled public String label{get;set;}
        @AuraEnabled public String section {get;set;}
        @AuraEnabled public String description {get;set;}
        @AuraEnabled public Boolean isDeleted{get;set;}
        @AuraEnabled public Datetime lastModifiedDate{get;set;}
        @AuraEnabled public String lastModifiedBy {get;set;}
        @AuraEnabled public Decimal apiVersion {get;set;}        
        @AuraEnabled public String nameSpace {get;set;}
        @AuraEnabled public String language {get;set;}
        @AuraEnabled public String delegateUser {get;set;}
        
    }
    
    
}