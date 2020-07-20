@isTest(SeeAllData=false)
public class AuditDataControllerTest {
    
    @isTest static void getUserListTest(){
       
        Test.startTest();
        
         //Fetching User List
        List<Map<String,String>> userMap = AuditDataController.getUserList();
        system.assertEquals(true, userMap.size()>0,'Users List');
        
        Test.stopTest();
    }
    
    @isTest static void auditDataLightningTest(){
        
        Test.startTest();
        
        List<AuditDataController.ChangedDataWrapper> auditList = AuditDataController.getChangedList('Lightning','','',5,0);
        
        Id userId = UserInfo.getUserId();
        auditList = AuditDataController.getChangedList('Lightning',userId,'',5,0);
        
        auditList = AuditDataController.getChangedList('Lightning',userId,system.today().format(),5,0);
        
        Test.stopTest();
        
    }
    
    @isTest static void auditDataClassicTest(){
        
        Test.startTest();
        List<AuditDataController.ChangedDataWrapper> auditList = AuditDataController.getChangedList('Classic','','',5,0);
        system.assertEquals(true, auditList.size() > 0 , 'setup audit trail data');
        
        Id userId = UserInfo.getUserId();
        auditList = AuditDataController.getChangedList('Classic',userId,system.today().format(),5,0);
        
        Test.stopTest();
        
    }
    
    
    
}