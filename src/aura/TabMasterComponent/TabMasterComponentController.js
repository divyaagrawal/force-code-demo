({
	doInit : function(component, event, helper) {
        component.set("v.varTabData",{});
        helper.getPageParameters(component, event, helper);
	},
    onPathHeaderStageChanged : function(component, event, helper){
        var stageName = event.getParam("StageName");
        console.log('onPathHeaderStageChanged : '+ stageName);
        component.set("v.varNewStageFromPathHeader", stageName);
        helper.saveCurrentStage(component, event, helper, 'Continue', component.get("v.varCurrentStage"));
	},
    handleFooterContinue : function(component, event, helper){
        component.set("v.varErrMsg", '');
        try{
            var footerAction = event.getParam("footerAction");
            var currentStage = component.get("v.varCurrentStage");
            console.log(currentStage + ' , footerAction = ' + footerAction);
            if(footerAction === 'Continue' || footerAction === 'Save'|| footerAction === 'Previous'){
                helper.saveCurrentStage(component, event, helper, footerAction, currentStage);
            }else if(footerAction === 'stageSaved'){
        		var prevFooterAction = component.get("v.varPrevFooterAction");
                if(prevFooterAction === 'Save'){
                    window.open('/'+component.get("v.recordId"), '_Self');
                }else{
                	helper.onSaveDone(component, event, helper, prevFooterAction);    
                }
            }else if(footerAction === 'Cancel'){
                window.open('/'+component.get("v.recordId"), '_Self');
            }
        }catch(e){
            console.log('Error : ' +e.message);  
            helper.showErrorMessage(component, event, helper, e.message);
        }
    },
   
})