({
	getData : function(component,event,helper) {
        debugger;
        
        var action = component.get('c.getAccountList');
        var appOption = component.get("v.appOption");
        action.setParams({ "appOption" : component.get("v.appOption")
                         });
        
        action.setCallback(this, $A.getCallback(function (response) {
            component.set('v.varSpinnerCls', 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") {
                var records = response.getReturnValue();
                component.set('v.records', records);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
            
        }));
        $A.enqueueAction(action);
        
    },
})