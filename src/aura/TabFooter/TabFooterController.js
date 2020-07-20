({
    onBtnClick : function(component, event, helper) {
        var btnLabel = event.getSource().get("v.label");
        var eventContinue = $A.get("e.c:TabFooterContinueEvent");
        console.log('Footer action: ' + btnLabel);
        //eventContinue.setParam("StageName", "one");
        eventContinue.setParam("footerAction", btnLabel);
        eventContinue.fire();
    }, 
    /* Commented By KKK : Not needed as per Story : B-B-80864 
    onPrevious : function(component, event, helper) {
        var eventContinue = $A.get("e.c:NAOFooterPreviousEvent");
        //eventContinue.setParam("StageName", "one");
        eventContinue.fire(); 
    }
    */
})