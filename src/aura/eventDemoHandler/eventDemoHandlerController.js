({
	handleEvent : function(component, event, helper) {
		var message = event.getParam("message");
        component.set("v.message",message);
        var intValue = parseInt(component.get("v.intValue")) +1;
        component.set("v.intValue",intValue);
	}
})