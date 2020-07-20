({
	doInit : function(component, event, helper) {
        console.log(' doInit.. Contacts ');
        
        var recordId = component.get("v.recordId");
        var sObjectName = 'Contact';
        console.log(' Account recordId '+recordId);
        var divId = component.find("contactsComp");
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