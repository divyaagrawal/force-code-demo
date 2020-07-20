({
    load: function(component) {
        
        var action = component.get("c.getIntent");
        action.setParams({
            "sentimentModel":  component.get("v.modelName") , 
            "textforIntent":  component.get("v.textToAnlyze") 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state'+state);
            if (state === "SUCCESS"){
                var predectionResult = response.getReturnValue();
                console.log(predectionResult);
                
                component.set("v.predectionResult" , predectionResult) ;
                
            } else if(state == "ERROR"){
                var errors = response.getError();
                console.log(errors);
            }
            
        });
        $A.enqueueAction(action);
        
        
    },
})