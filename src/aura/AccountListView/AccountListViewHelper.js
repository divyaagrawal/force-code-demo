({
    
    fetchAccountList: function(component, event, helper) {
        //Call Apex class and pass account list parameters
        var action = component.get("c.getAccounts");
        action.setCallback(this, function(response) {
            debugger;
            var state = response.getState();
            if (state === "SUCCESS") {
                var accountList = response.getReturnValue();
                console.log('AccountlIst'+accountList);
            }
        }); 
        $A.enqueueAction(action);
    },
    
   
})