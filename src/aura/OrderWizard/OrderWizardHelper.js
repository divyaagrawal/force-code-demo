({    
    searchKeyChange : function(component, event, helper) {
        debugger;
        var searchKey = component.get("v.myEnterSearch");
        var action = component.get("c.findDeviceList");
        action.setParams({
            "searchKey": searchKey,
            "limits": component.get("v.rowsToLoad"),
            "offsets": component.get("v.rowNumberOffset")
        });
        action.setCallback(this, $A.getCallback(function (response) {
            component.set('v.varSpinnerCls', 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") {
                debugger;
                var recordList = response.getReturnValue();
                console.log('response.getReturnValue()'+JSON.stringify(response.getReturnValue()));
                component.set('v.records', recordList);
                
                if(recordList.length < component.get("v.rowsToLoad")){
                    component.set('v.enableInfiniteLoading', false);
                    component.set('v.loadMoreStatus', '');
                    component.set('v.loadMore', false);
                }else{
                    component.set("v.rowNumberOffset",component.get("v.rowsToLoad") - 1); 
                    component.set('v.loadMore', true);
                }
                component.set("v.rows",recordList.length); 
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
            
        }));
        $A.enqueueAction(action);
    },
    
    
    fetchData: function(component){
        var searchKey = component.get("v.myEnterSearch");
        
        return new Promise($A.getCallback(function(resolve, reject) {
            var action = component.get('c.findDeviceList');
            action.setParams({
                "searchKey": searchKey,
                "limits": component.get("v.rowsToLoad"),
                "offsets": component.get("v.rowNumberOffset")
            });
            action.setCallback(this, function(a) {
                resolve(a.getReturnValue());
            });
            $A.enqueueAction(action);
        }));
        
    } 
    
    
    
})