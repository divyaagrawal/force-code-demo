({
    // For getting the page parameters ...
    getPageParameters : function(component, event, helper){
    	var recId = component.get("v.pageReference.state.id");
        var stage = component.get("v.pageReference.state.stage");
        if(!$A.util.isUndefinedOrNull(recId)){ component.set("v.recordId", recId); }
        if(!$A.util.isUndefinedOrNull(stage)){ component.set("v.varStage", stage); }
    	helper.initTabWrapper(component, event, helper);        
    },
   initTabWrapper :function(component, event, helper){
        try{
            var action = component.get("c.initTabData");
            action.setParams({ "recordId" : component.get("v.recordId")});
            action.setCallback(this, function(response){ 
                try{
                    if(response.getState() === "SUCCESS"){
                        var res = response.getReturnValue();
        				component.set("v.varTabData",res);
                        if(!$A.util.isUndefinedOrNull(component.get("v.varStage"))){
                            component.set("v.varCurrentStage", component.get("v.varStage")); 
                        }else{
                           component.set("v.varCurrentStage", 'Getting Started'); 
                        }
                        helper.updatePathHeader(component, event, helper);
                    }else if (response.getState() === "ERROR"){
                        var errors = response.getError();
                        var errMsg = errors[0].message;
                        console.log('initTabData Error : ' + errMsg);
                        helper.showErrorMessage(component, event, helper, errMsg);
                    }
                }catch(e){
                    console.log(e.message); 
                    helper.showErrorMessage(component, event, helper, e.message);
                }
            });
            $A.enqueueAction(action);
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message);
        }
    },
    
    updatePathHeader : function(component, event, helper){
        var res = component.get("v.varTabData");
        alert('path header'+res.pathHeader );
    	component.set("v.varTabPathHeader", res.pathHeader);
        
        // As we don't have back-end logic for rest of screens so making the stage completed ...
        var currentStage = component.get("v.varCurrentStage");        
        /*if(currentStage != 'Getting Started' && currentStage != 'Client Information' && currentStage != 'Beneficiary'){
        	var ary = res.pathHeader;
            if(!$A.util.isUndefinedOrNull(ary)){
                for(var i=0; i<ary.length; i++){
                    if(ary[i].stageName == currentStage){
                        ary[i].isComplete = true;
                    }
                }
            }
        }  */
    },
   /* unused---- getBody : function(component, event, helper, param, compname){
        var cmpbody = component.find("cmpbody");
        $A.createComponent( compname, param,
                           function (contentComponent, status, error) {
                               if (status === "SUCCESS") {
                                   cmpbody.set("v.body", contentComponent);
                               } else {
                                   console.log('Error while getBody initialization !');
                               }
                           });	 
    }, */
    // For moving to next wizard ...
    saveCurrentStage  : function(component, event, helper, footerAction, currentStage){
        var currentStageDomId = currentStage.toLowerCase().replace(" ","");
        var childComponent = component.find(currentStageDomId);
        component.set("v.varPrevFooterAction", footerAction);
        //For avoiding the stages which donot have back-end functionality ...
        if(currentStage === 'Getting Started' || currentStage === 'Details' || 
           currentStage === 'Additional Details'){
            console.log('saveCurrentStage in TabData');
           // childComponent.saveNAOData();
        }else{
            console.log('direct save');
            helper.onSaveDone(component, event, helper, component.get("v.varPrevFooterAction"));
        }
    },
    // For moving to next wizard ...
    onSaveDone  : function(component, event, helper, footerActionDone){
        try{
            helper.updatePathHeader(component, event, helper);
            var currentStage = component.get("v.varCurrentStage");
            var newStageFromPathHeader = component.get("v.varNewStageFromPathHeader");
            
            console.log('currentStage : ' +currentStage);  
            console.log('footerActionDone : ' +footerActionDone);  
            console.log('newStageFromPathHeader : ' +newStageFromPathHeader);  
            
            // For checking the next stage from Path Header Navaigation ...
            if(!$A.util.isUndefinedOrNull(newStageFromPathHeader) && !$A.util.isEmpty(newStageFromPathHeader) && footerActionDone == 'Continue'){
                component.set("v.varCurrentStage", newStageFromPathHeader);
                component.set("v.varNewStageFromPathHeader", '');
            }else{
                helper.moveStage(component,currentStage,footerActionDone);
            }
        }catch(e){
            console.log(e.message); 
            helper.showErrorMessage(component, event, helper, e.message);
        }
    }, 
    getHeader : function(component, event, helper){
            
    }, 
    /*
     * For showing the error messages
    */
    showErrorMessage : function(component, event, helper, msg){
        component.set("v.varErrMsg", msg);
    },
    moveStage : function(component, currentStage,footerActionDone){
        var TabData=component.get("v.varTabData");
        var currentIndex=-1;
        var prevIndex=-1;
        var nextIndex=-1;
        if(TabData!=null && TabData.pathHeader!=null){
            for(var index=0;index<TabData.pathHeader.length;index++){
                var pathData=TabData.pathHeader[index];
                if(currentIndex!=-1 && nextIndex==-1){
                    if(pathData.isVisible==true){
                        nextIndex=index; 
                        break;
                    }
                }
                if(pathData.stageName==currentStage){
                    currentIndex=index;
                }
                // set prev Index
                if(currentIndex==-1){
                    if(pathData.isVisible==true){
                      prevIndex=index;  
                    }
                }
                
               
            }
            if(currentIndex!=-1){
                if(prevIndex!=-1){
                    if(footerActionDone == 'Previous'){ component.set("v.varCurrentStage",TabData.pathHeader[prevIndex].stageName); }
                }
                if(nextIndex!=-1){
                    if(footerActionDone == 'Continue'){ component.set("v.varCurrentStage",TabData.pathHeader[nextIndex].stageName); }
                }
            }
        }
        
    }
})