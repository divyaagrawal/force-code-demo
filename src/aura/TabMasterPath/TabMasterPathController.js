({
    doInit : function(component, event, helper) {
        console.log('path header'+component.get("v.tabPathHeader"));
      
	},
  	onStageSelect : function(component, event, helper){
        var stage = event.currentTarget.getAttribute("title"); 
        //component.set("v.currentStage",stage);
        console.log('stage: '+stage);
        var eventContinue = $A.get("e.c:TabMasterPathEvent");
        eventContinue.setParam("StageName", stage);
        eventContinue.fire(); 
    }
})