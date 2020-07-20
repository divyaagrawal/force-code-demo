({
    initialize :function(component, event, helper){
        try{
           
             var data = JSON.stringify(component.get("v.TabData"));
           alert('data at @ getting started' + data);
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message);  
        }
    },
   
    /*
   
    fillPickLists : function(component, event, helper, picklistMap, picklistCmp, defaultValue){
        try{
            if(!$A.util.isUndefined(picklistCmp)){
                var opts= [];
                opts.push({"class": "optionClass", label: defaultValue, value: ''});
                if(!$A.util.isEmpty(picklistMap)){
                    for(var key in picklistMap){
                        opts.push({"class": "optionClass", label: picklistMap[key], value: key});
                    }
                }
                picklistCmp.set("v.options", opts);
            }
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message);  
        }
    },

    
     * common method to fill the picklist options
  
    emptyPickList : function(component, event, helper, prop, picklistCmp){
        try{
            if(!$A.util.isUndefined(picklistCmp)){
                component.set(prop, '');
                var opts= [];
                opts.push({"class": "optionClass", label: 'Select an Option', value: ''});
                picklistCmp.set("v.options", opts);
            }
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message);  
        }
    },
   
     * For saving the data
   
    saveNAOData : function(component, event, helper){
        try{
            if(helper.validate(component, event, helper)){
                helper.showErrorMessage(component, event, helper, ''); 
                helper.toggleSpinner(component, event, helper, 'slds-show');
                if(component.get("v.varDisplayPershingPlans")){
                	helper.addAdditionalTransactions(component, event, helper);    
                }else{// Added by kailash : If Sponsor updated then no empty the Additional_Transaction ...
                    component.set("v.NAOData.gettingStartedObj.caoApp.Additional_Transactions__c", '');
                }
                var data = JSON.stringify(component.get("v.NAOData"));
                var action = component.get("c.saveNAOData");
                action.setParams({"naoDataStr" : data, "step": 'Getting Started'});
                action.setCallback(this, function(response){ 
                    try{
                        var res = response.getReturnValue();
                        if(response.getState() === "SUCCESS"){
                            if(!$A.util.isEmpty(res)){
                                component.set("v.NAOData", res);    
                                helper.goToNextStep(component, event, helper);    
                                helper.toggleSpinner(component, event, helper, 'slds-hide');
                            }else{
                            	helper.showErrorMessage(component, event, helper, 'Somethign went wrong!');    
                            }
                        }else if (response.getState() === "ERROR"){
                            var errors = response.getError();
                            var errMsg = errors[0].message;
                            console.log('Error : ' + errMsg);
                            helper.showErrorMessage(component, event, helper, errMsg);            
                        }
                    }catch(e){
                        console.log(e.message);  
                        helper.showErrorMessage(component, event, helper, e.message); 
                    }
                });
                $A.enqueueAction(action);
            }
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message);  
        }
    },
    
     * For loading the next step of wizard ...
    
    goToNextStep : function(component, event, helper){
        var eventContinue = $A.get("e.c:NAOFooterContinueEvent");
        eventContinue.setParam("footerAction", 'stageSaved');
        eventContinue.fire();        
    },
    
   
     * For performing the compliance check ...
    
    doComplianceCheck : function(component, event, helper, ComplianceCheckType){
        try{
            if(helper.validate(component, event, helper)){
                helper.showErrorMessage(component, event, helper, ''); 
                helper.toggleSpinner(component, event, helper, 'slds-show');
                var action = component.get("c.doComplianceCheck");
                action.setParams({"ComplianceCheckType" : ComplianceCheckType, 
                                  "repNum": component.get("v.NAOData.gettingStartedObj.repNumber"), 
                                  "firstName" : component.get("v.NAOData.clientObj.FirstName"),
                                  "lastName": component.get("v.NAOData.clientObj.LastName"), 
                                  "ssn" : component.get("v.NAOData.clientObj.SSN__c"),
                                  "productType": component.get("v.NAOData.gettingStartedObj.caoApp.Product_Type__c"), 
                                  "workitemId" : component.get("v.NAOData.gettingStartedObj.caoApp.WorkItem_ID__c"),
                                  "state": component.get("v.NAOData.gettingStartedObj.caoApp.State__c")});
            
                action.setCallback(this, function(response){ 
                    try{
                        var res = response.getReturnValue();
                        if(response.getState() === "SUCCESS"){
                            if(!$A.util.isUndefinedOrNull(res)){
                                component.set("v.varComplianceCheckMsg", res);
                            }
                            component.set("v.varIsComplianceCheck", true);
                            helper.toggleSpinner(component, event, helper, 'slds-hide');
                        }else if (response.getState() === "ERROR"){
                            var errors = response.getError();
                            var errMsg = errors[0].message;
                            console.log('Error : ' + errMsg);
                            helper.showErrorMessage(component, event, helper, errMsg);            
                        }
                    }catch(e){
                        console.log(e.message);  
                        helper.showErrorMessage(component, event, helper, e.message); 
                    }
                });
                $A.enqueueAction(action);
            }
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message);  
        }
    },
    
     * For validating the data...
   
    validate : function(component, event, helper){
        var flg = true;
        try{
            helper.emptyErrorMsg(component, event, helper);
            // For all product drop-down Validation ...
            var compIds = ["sponsor","producttype","registrationtype","productname","pershingplantype"];
            for(var i=0; i<compIds.length; i++){
                var auraDom = component.find(compIds[i]);
                if(!$A.util.isEmpty(auraDom)){
                    var auraDomValue  = auraDom.get("v.value");
                    var isDisabled = auraDom.get("v.disabled");
                    if(!isDisabled && $A.util.isEmpty(auraDomValue)){
                        auraDom.set("v.errors", [{message:"This is required"}]);
                        flg = false;
                    }
                }
            }
            // For Joint Owner/ Rep Code Validation ...
            var comArray  = [];
            comArray.push(component.find('RepCode'));
            if(component.get("v.NAOData.gettingStartedObj.isJointOwner") === 'Yes'){
            	comArray.push(component.find('jointowner'));    
            }
            var isValid = comArray.reduce(function (validSoFar, inputCmp) {
                inputCmp.showHelpMessageIfInvalid();
                return validSoFar && !inputCmp.get('v.validity').valueMissing;
            }, true);
            
            if($A.util.isUndefinedOrNull("v.NAOData.gettingStartedObj.repNumberId")){
                flg = false;
                helper.showErrorMessage(component, event, helper, 'Please select a valid Rep.');  
            }
            
            flg = flg ? isValid : flg;
            console.log('flg = '+ flg); 
            return flg;
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message);  
        }
    },
   
   
     * For showing the error messages
  
    showErrorMessage : function(component, event, helper, msg){
        helper.toggleSpinner(component, event, helper, 'slds-hide');
        component.set("v.varErrMsg", msg);
    },
    
     * For toggle the action spinner
   

    fireAccDetailsUpdateEvent : function(cmp, event) {
        
        var sponCust = cmp.get("v.NAOData.gettingStartedObj.caoApp.Sponsor__c");
        var prdType = cmp.get("v.NAOData.gettingStartedObj.caoApp.Product_Type__c");
        var cmpEvent = cmp.getEvent("dynamicAccDetails");
        console.log('Entered into event'+sponCust +'@@@'+prdType);
        //var cmpEvent = $A.get("e.c:DynamicAccountDetailsDisplay");
        cmpEvent.setParams({
            "sponsororCustodian" : sponCust ,
            "productType" : prdType });
        cmpEvent.fire();
    }, */
    
     toggleSpinner : function(component, event, helper, prop) {
        component.set('v.varSpinnerCls', prop);
    },
        
         /*
     * For emptying the error messages ...
    */
    emptyErrorMsg : function(component, event, helper){
        var compIds = ["sponsor","producttype","registrationtype","productname","pershingplantype"];
        for(var i=0; i<compIds.length; i++){
            var auraDom = component.find(compIds[i]);
            if(!$A.util.isEmpty(auraDom)){
                auraDom.set("v.errors", null);
            }
        }
        helper.showErrorMessage(component, event, helper, ''); 
    },
})