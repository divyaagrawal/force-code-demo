({
	doInit : function(component, event, helper) {
        console.log(' doInit ');
        helper.fetchUserInfo(component, event, helper);
	},
    //open client detail window from the data table
    handleDataCellClickEvent :  function(component, event, helper) {
    	helper.handleDataCellClickEvent(component, event, helper);
    },
    // allow user to select an action to be performed from the action column inside the data table
    handleRowActionEvent : function(component, event, helper) {	
    	helper.handleRowActionEvent(component, event, helper);
    },
})