public with sharing class DynamicRowController {
   
    @AuraEnabled
    public static void saveContacts(List<Contact> ListContact){
        Insert ListContact;
    }
    @AuraEnabled
    public static List<String> listAllObject(){
        List<String> objectList = new List<String>();
        For(Schema.sObjectType sobj: schema.getGlobalDescribe().values()){
            if(sobj.getDescribe().isQueryable())
            	objectList.add(sobj.getDescribe().getName()+'####'+sobj.getDescribe().getLabel());
        }
        
        return objectList;
    }
    
     @AuraEnabled
    public static void saveData(String ListData){
        
       
       // List<sObject> objs =(List<sObject>)JSON.deserialize(ListData, List<sObject>.class);
       // Map<String, Object> genericRecord= (Map<String, Object>)JSON.deserializeUntyped(ListData);
        //Case[] objs =(Case[])JSON.deserialize(ListData, List<Case>.class);
      //System.debug('objs '+objs);
        
        try{
            
            List<Object> meta = (List<Object>) JSON.deserializeUntyped(ListData);
           System.debug('meta '+meta);
            
            List<Object> toInsert = new List<Object>();
            for(Object ob : meta){
              
               System.debug('ob '+ob);
                String s = JSON.serialize(ob);
                System.debug('s '+s);
               // ob.sobjectType = 'Case';
                
              //  if(ob.label != ''){
               //     toInsert.add(ob);
              //  }
    
               
            }
            
           // system.debug('List :::: '+ toInsert);
          //  if(toInsert != null && toInsert.size() >0){
              //  Database.insert(toInsert, false);
           // }
            
            String s1 = JSON.serialize(meta.get(1));
            Map<String ,Object> m = (Map<String ,Object>) JSON.deserializeUntyped(s1);
            List<Object> l1 = new List<Object>();
              System.debug('m '+m.get('listOfapiName'));
           // l1.add(m.get('listOfapiName'));
          //  insert l1;
            
           // List<Map<string,String>> mapString = new List<Map<string,String>>();
//mapString.add(m.get('listOfapiName'));
            
            
          /*  for(Object m1 : l1){
               // System.debug('value '+m1);
                String s2 = JSON.serialize(m1);
               // System.debug('s2 '+s2);
              //  List<Object> m2 = (List<Object>) JSON.deserializeUntyped(s2);
                //System.debug('m2 '+m2);
                
                Case[] objs =(Case[])JSON.deserialize((String) s2, List<Case>.class);
      System.debug('objs '+objs);
                
                
                //for(Object o : m2){
                   // System.debug('o '+o);
               // }
            }*/
           
           // Insert objs;
            
        }catch(Exception e){
            System.debug('Exception '+e);
        }
        
        
    }
 @AuraEnabled
    public static DynamicBindingWrapper listAllFields(String objectName , String FieldSet){
        
        DynamicBindingWrapper dynamicData = new DynamicBindingWrapper();
        try{
        List<fieldDataWrapper> wrapperList =  new List<fieldDataWrapper>();
        // Create Dynamic Query Start ..
        String theQuery = 'SELECT ';
        SObjectType sObjectName = Schema.getGlobalDescribe().get(objectName);
        
        //.....................start 
        
        Schema.DescribeSObjectResult res = Schema.getGlobalDescribe().get(objectName).getDescribe();
        Schema.FieldSet fieldSetObj = sObjectName.getDescribe().FieldSets.getMap().get(FieldSet);
       System.debug('fieldSetObj '+fieldSetObj);
         for (Schema.FieldSetMember f: fieldSetObj.getFields()) {
             
             Schema.SObjectField field= f.getSObjectField();
               fieldDataWrapper wrapper = new fieldDataWrapper();
               theQuery += field.getDescribe().getName() + ',' ;
                wrapper.label = field.getDescribe().getLabel();
                wrapper.apiName = field.getDescribe().getName();
                wrapper.dataType = String.ValueOf(field.getDescribe().getType());
                List<Schema.Picklistentry>fld = field.getDescribe().getPicklistValues();
                   wrapper.pickListValues=new List<String>();
                   
                   for(integer i=0;i<fld.Size();i++){
                  wrapper.pickListValues.add(fld[i].getvalue());
                      
                }   
               System.debug('wrapper '+wrapper);
                wrapperList.add(wrapper);
             dynamicData.fieldList = wrapperList;
             listOfAllFields(dynamicData);
     }

        System.debug('dynamicdata '+dynamicData);
        
            
        }catch(Exception e){
            System.debug('Exception '+e);
        }
        return dynamicData;
 //.......................end
        
       
    }
    
    
    

    
    /* Class to store the dynamic data 
     * and list of related fields
     */ 
    public class DynamicBindingWrapper{
        @AuraEnabled
        public List<sObject> sObjectData    { get; set; }
        @AuraEnabled
        public List<fieldDataWrapper> fieldList { get; set; }
    }
    /*
     * Class to store the field information
     */ 

    public class fieldDataWrapper{
        @AuraEnabled
        public String label { get; set; }
        @AuraEnabled
        public String apiName { get; set; }
        @AuraEnabled
        public String dataType { get; set; }
         @AuraEnabled
        public List<String> pickListValues { get; set; }   
    }
    
    
    @AuraEnabled
    public static List<String> listOfAllFields(DynamicBindingWrapper dynamicData){
        List<String> listOfAllFields = new List<String>();
        
        for(fieldDataWrapper fields : dynamicData.fieldList){
             System.debug('fields '+fields.label);
            listOfAllFields.add(fields.label);
         }
           
        System.debug('listOfAllFields '+listOfAllFields);
        return listOfAllFields;
    }

    
}