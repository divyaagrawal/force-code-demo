({
	closePopup : function(component, event, helper) {
      // $A.get("e.force:closeQuickAction").fire();  
        
        
       $A.get("e.c:OpportunitySendForApprovalCloseEvent").fire();
    }
})