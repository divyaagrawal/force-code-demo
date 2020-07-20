({
    doInit : function(component, event, helper) {
        console.log('Getting Started TabData : '+ JSON.stringify(component.get("v.TabData")));
		helper.initialize(component, event, helper);
    },
 
   

    
    /*
     * For repNumber search lookup
    */
   /* repNumberSearch : function(component, event, helper) {
        try{
            helper.showErrorMessage(component, event, helper, ''); 
            var lookUpDiv = component.find("lookupDiv");
            helper.toggleSpinner(component, event, helper, 'slds-show');
            $A.createComponent('c:repNumberSearch', {"modelSize": 'slds-modal_medium',"repNumber":component.get("v.NAOData.gettingStartedObj.repNumber")},
                               function (contentComponent, status, error) {
                                   if (status === "SUCCESS") {
                                       lookUpDiv.set('v.body', contentComponent);
                                   } else {
                                       var msg = component.get("v.errorMessage");
                                       helper.showMessage(component, event, msg, 'slds-theme_error' , 'utility:error');
                                   }
                                   helper.toggleSpinner(component, event, helper, 'slds-hide');
                               });
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message);  
        }
    },  */

    /*
     * For saving the screen
    
    handleSaveMethod : function(component, event, helper){
        try{
            helper.showErrorMessage(component, event, helper, '');  
            var IsComplianceCheckDone = component.get("v.varIsComplianceCheck");
            console.log('IsComplianceCheckDone : '+ IsComplianceCheckDone);
            component.set("v.varComplianceCheckMsg", ''); 
            if(IsComplianceCheckDone){
                helper.saveNAOData(component, event, helper);
            }else{                
                helper.doComplianceCheck(component, event, helper, 'LT');
            }
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message);  
        }
    },
   
     * For checkbox enable condition in Additional Transactions section
   
    onAddTransChange : function(component, event, helper) {
		if(event.getSource().get("v.name") == "inputAT") {
            var inputJR = component.find("inputJR");
            inputJR.set("v.checked",false);
        }
        else if(event.getSource().get("v.name") == "inputJR") {
           	var inputAT = component.find("inputAT");
            inputAT.set("v.checked", false); 
        }
    } */
})