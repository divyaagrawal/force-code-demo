trigger CaseTrigger on Case (after insert) {

    if(Trigger.isAfter == true && Trigger.isInsert == true){
        CaseTriggerHandler.onAfterInsert(trigger.new);
    }  
}