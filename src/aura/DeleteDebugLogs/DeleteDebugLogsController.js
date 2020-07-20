({
    init: function (component, event, helper) {
        helper.fetchNoOfLogs(component, event, helper);
    },
    
    deleteLogsClick : function(component, event, helper) {
        helper.deleteLogs(component,event,helper);
    },
    
})