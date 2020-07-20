({
	AddNewRow : function(component, event, helper){
 
        var sObjectInstance=component.get("v.sObjectInstance");
        var listOfAllFields=component.get("v.listOfAllFields");
       var ListOfCell=component.get("v.ListOfCell");
       var cellVal={};
       
        for(var i=0 ; i<listOfAllFields.length ; i++){
            
            var cellValue=listOfAllFields[i].apiName;
            var apiname=ListOfCell[i];
           
            cellVal[apiname]=cellValue;
            component.set('v.sObjectInstance', {
                cellVal
            });
            
            
        }
        
         sObjectInstance=component.get("v.sObjectInstance");
               sObjectInstance=sObjectInstance["cellVal"];
                component.set('v.sObjectInstance',sObjectInstance);
                sObjectInstance=component.get("v.sObjectInstance");
                //alert(sObjectInstance);
       
      component.getEvent("AddRowEvt").fire();     
    },
    
    removeRow : function(component, event, helper){
     // fire the DeleteRowEvt Lightning Event and pass the deleted Row Index to Event parameter/attribute
       component.getEvent("DeleteRowEvt").setParams({"indexVar" : component.get("v.rowIndex") }).fire();
    },
    getRowValue : function(component, event, helper){
        
        //var index = event.getSource().get("v.name");  //name - the obct's Id from iteration
                      //alert(component.get("v.rowIndex"));
   // const index = listOfAllFields.indexOf(vacancy);
        //alert(index);
        var whichOne= event.getSource().getLocalId();
       
           
    }
})