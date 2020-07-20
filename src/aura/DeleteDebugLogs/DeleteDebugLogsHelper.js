({
    fetchNoOfLogs : function(component,event,helper) {
        //Clearing Msgs
        component.set('v.successMsg', '');
        component.set('v.errorMsg', '');
        
        var action = component.get('c.fetchNoOfLogs');
        component.set('v.varSpinnerCls', 'slds-show');
        action.setCallback(this, $A.getCallback(function (response) {
            component.set('v.varSpinnerCls', 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") {
                var noOfLogs = response.getReturnValue();
                component.set('v.noOfLogs', noOfLogs);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
                component.set('v.errorMsg', errors);
            }
            
        }));
        $A.enqueueAction(action);
        
    },
    
    
    deleteLogs : function(component,event,helper) {
        
         //Clearing Msgs
        component.set('v.successMsg', '');
        component.set('v.errorMsg', '');
        
        var action = component.get('c.deleteLogs');
        component.set('v.varSpinnerCls', 'slds-show');
        action.setCallback(this, $A.getCallback(function (response) {
            component.set('v.varSpinnerCls', 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") {
                debugger;
                var msg = response.getReturnValue();
                component.set('v.successMsg', msg);
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
                component.set('v.errorMsg', errors);
            }
            
        }));
        $A.enqueueAction(action);
        
    },
    
    
})