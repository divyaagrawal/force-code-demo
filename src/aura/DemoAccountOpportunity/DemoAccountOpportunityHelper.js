({
    getData : function(component,event,helper) {
        
        var action = component.get('c.getAccountList');
        
        action.setParams({ });
        action.setCallback(this, $A.getCallback(function (response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                debugger;
                var accountList = response.getReturnValue();
                component.set('v.accountList',accountList);
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
            
        }));
        $A.enqueueAction(action);
        
    },
    
    
})