({
	doInit : function(component, event, helper) {
		var row = component.get("v.row");
        var column = component.get("v.column");
        component.set("v.cellValue", row[column.name]); 
	},
    
    onLinkClick : function(component, event, helper) {
    	var dataCellClickEvent = component.getEvent("dataCellClickEvent");
        dataCellClickEvent.setParams({"row" : component.get("v.row"), "column" : component.get("v.column").name});
		dataCellClickEvent.fire();
		
    },
})