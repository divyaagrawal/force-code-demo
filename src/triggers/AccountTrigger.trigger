trigger AccountTrigger on Account (before insert, before delete) {
    
    //Before Insert 
  
    /*if(Trigger.isBefore && Trigger.isInsert){
        AccountTriggerHandler.beforeInsertHandling(trigger.new);
    }
    */
    
     if(Trigger.isDelete){
        Map<Id,Account> accMap = trigger.oldMap;
        Set<id> ids = accMap.keySet();
       
        List<Account> accList = [select id ,(select id from contacts) from account where id In: ids];
        for(Account acc:accList){
            system.debug('akashii' + + acc.contacts);
            if(acc.contacts.size()>=2){
                system.debug('akash' + acc.contacts.size() );
                trigger.oldMap.get(acc.Id).addError('akash');
            }
    }
    }
    
}