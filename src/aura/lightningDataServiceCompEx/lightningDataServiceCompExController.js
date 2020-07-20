({
	saveRecordCntrlr : function(component, event, helper) {
          component.find("recordHandler").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
            	console.log('recordSaved');
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                cmp.set("v.recordError", saveResult.error[0].message);
                console.log('Problem saving record, error: ' + saveResult.error[0].message);
            } else {
                cmp.set("v.recordError", "")
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        }));
	},
     handleRecordUpdated: function(component, event, helper) {
     var eventParams = event.getParams();
        if(eventParams.changeType === "ERROR") {
            var recordSaveError = $A.get("e.force:showToast");
            recordSaveError.setParams({
                "title": "Error",
                "message": component.get("v.error")
            });
               recordSaveError.fire();
        }
     }
})