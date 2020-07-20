({
    doInit : function(component, event, helper) {
        helper.MSLAccessInteractionVisibility(component , event , helper);
        debugger;       
        //component.set("v.currentStage",'tab1');
        helper.toggleSpinner(component,'show');
        var recordId = component.get('v.recordId');
        if(typeof recordId !== "undefined"){
            helper.loadInteractionData(component, event, helper);
        }else{
            component.set("v.currentStage",'tab1');
        	component.set('v.howAndWhenData',{'selectedType':'','radioType':'','selectedDate':'','startTime' : '8:00am','endTime' : '9:00am'});
        	component.set('v.WhatSubjectsData',{'selectedSubjects' : [],'bTherapeuticSelected' : true});
        }
        if(component.get('v.sObjectName') == 'Interaction__c'){
            component.set('v.interactionId',component.get('v.recordId'));
            component.set('v.isSaved',true);
        }
        
    },
    
    handleMaInteractionWizardEvent : function(component, event, helper) {
        var eventType = event.getParam("type");
        
        if(eventType == 'showLoadingSpinner')
            helper.toggleSpinner(component,'show');
        
        else if(eventType == 'hideLoadingSpinner')
            helper.toggleSpinner(component,'hide');
        
            else if(eventType == 'error'){
                var error = event.getParam('error');
                var errorMsg = event.getParam('errorMsg');
                helper.showError(component,errorMsg,error);
            }
    },
    showError : function(component,errorMsg, error){
        this.toggleSpinner(component,'hide');
        component.set('v.errorMsg',errorMsg);
        $A.util.addClass(component,'showError');
        if(error.length	== 1 && !_.isUndefined(error[0].message))
            console.log(error[0].message);
        else
            console.log(error);
    },
    closeError : function(component, event, helper){
        component.set('v.showError',false);
        component.set('v.showSuccess',false);
    },
    
    firstTabClicked : function(component, event, helper) {
      //  if(helper.validateData(component,component.get('v.currentStage')))
        	component.set('v.currentStage','tab1');
    },
    
    secondTabClicked : function(component, event, helper) {
       // if(helper.validateData(component,component.get('v.currentStage')))
        	component.set('v.currentStage','tab2');
    },
    
    thirdTabClicked : function(component, event, helper) {
      //  if(helper.validateData(component,component.get('v.currentStage')))
        	component.set('v.currentStage','tab3');
    },
    
    fourthTabClicked : function(component, event, helper) {
    //  if(helper.validateData(component,component.get('v.currentStage'))){
            helper.setupData(component,'fourthTab');
        	if(helper.validateSubjectSelection(component))
            	component.set('v.currentStage','tab4');
    	//}
    },
    fifthTabClicked : function(component, event, helper) {
    //  if(helper.validateData(component,component.get('v.currentStage'))){
            helper.setupData(component,'fifthTab');
            component.set('v.currentStage','tab5');
    	//}
    },
    
    moveBack : function(component, event, helper) {
        var currentTab = component.get('v.currentStage');
        if(currentTab != '' && currentTab != null /*&& helper.validateData(component,currentTab)*/){
            var tabIndex = currentTab.substring(3,4);
            var intVal = parseInt(tabIndex);
            var newVal = intVal-1;
            component.set('v.currentStage','tab'+newVal);
        }
    },
    
    moveNext : function(component, event, helper) {
        var currentTab = component.get('v.currentStage');
        if(currentTab != '' && currentTab != null /*&& helper.validateData(component,currentTab)*/){
            var tabIndex = currentTab.substring(3,4);
            var intVal = parseInt(tabIndex);
            var newVal = intVal+1;
            if(newVal === 4 && helper.validateSubjectSelection(component)){
                helper.setupData(component,'fourthTab');
                component.set('v.currentStage','tab'+newVal);
            }else if(newVal != 4)
            component.set('v.currentStage','tab'+newVal);
        }
    },
    
    submit : function(component, event, helper) {
        var result = window.confirm('Are you sure you want to submit the interaction record? It cannot be modified once submitted.');
        if(result){
        if(helper.validateData(component,'tab2','Submit')){
            if(helper.validateData(component,'tab3','Submit')){
               if(helper.validateData(component,'tab4','Submit')) 
                   helper.saveData(component,'submit');
            	}
        	}
        }
    },
    
    save : function(component, event, helper) {  
        if(helper.validateData(component,'tab1','Submit')){
            if(helper.validateData(component,'tab2','Save'))
                helper.saveData(component,'save');
        }      	
        /*var popup = window.open(location, '_self', '');
        popup.close();*/
    },
    
     cancel : function(component, event, helper) {  
        var result = window.confirm('All the unsaved changes will be lost. Would you like to continue?');
         if(result){
             var popup = window.open(location, '_self', '');
        	popup.close();
         }
       
    },
    
    delete : function(component, event, helper) { 
		var result = window.confirm('Are you sure you want to discard this draft interaction? It cannot be reverted.');
         if(result){
           helper.deleteRecord(component);
         }
	},
    
    openInteraction : function(component, event, helper){
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": component.get('v.interactionId'),
          "slideDevName": "detail"
        });
        navEvt.fire();
    }
    
})