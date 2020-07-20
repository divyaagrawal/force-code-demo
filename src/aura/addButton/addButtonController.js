({
    changeColor: function(component, event, helper) { 
        var currentButton = event.getSource(); 
        var currentVariant = currentButton.get("v.variant");
        if(currentVariant == 'Success'){
            currentButton.set("v.variant", "Neutral");
        }else{
            currentButton.set("v.variant", "Success");  
        }
    },
    
})