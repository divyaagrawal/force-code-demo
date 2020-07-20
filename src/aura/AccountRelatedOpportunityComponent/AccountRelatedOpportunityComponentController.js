({
	doInit : function(component, event, helper) {
        console.log(' doInit ');
        
        var recordId = component.get("v.recordId");
        var sObjectName = 'Opportunity';
        console.log(' Opportunity recordId '+recordId);
        var divId = component.find("opportunityComp");
        $A.createComponent("c:RelatedListComponent", {
            "recordId":recordId,
            "sObjectName": sObjectName,
            "iconName" : "standard:maintenance_plan"
        }, function (contentComponent, status, error) { 
            if (status === "SUCCESS") {
                divId.set('v.body', contentComponent);
                console.log('data grid created');
            } else {
                console.log('data grid error');
                throw new Error(error);
            }
        });
    }
})