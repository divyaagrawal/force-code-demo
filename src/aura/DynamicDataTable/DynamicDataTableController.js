({
    
    doInit : function(component, event, helper) {	
   	    helper.doInit(component, event, helper);
    },
    
	doSort : function(component, event, helper) {
        var colName = event.currentTarget.dataset.colname;
		helper.sortBy(component, event, helper, colName );
	},
    
    onFilterChange : function(component, event, helper) {
        var params = event.getParam('arguments');
        if (params) {
            var filteredData = params.filteredData;
            component.set("v.dataList", filteredData);
        }
    	helper.calculateTotals(component, event, helper);
	},
    
   handleMenuSelect : function(component, event, helper) {
       var actionVal = event.detail.menuItem.get("v.value");
       var actionArr = actionVal.split("-");
       if(!$A.util.isEmpty(actionArr) && actionArr.length == 2){
           var data = component.get("v.dataList");
           var rowIndex = actionArr[1];
           var rowData = data[rowIndex];
           var actionName = actionArr[0];
           
           var rowActionEvent = component.getEvent("rowActionEvent");
           rowActionEvent.setParams({"row" : rowData, "actionName" : actionName});
		   rowActionEvent.fire();
       }
   }
})