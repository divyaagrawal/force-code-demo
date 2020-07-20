trigger ContactTrigger on Contact (after update, after insert) {

    if(Trigger.isAfter && (Trigger.isUpdate || Trigger.isInsert)){
        
        list<contact> contactList = trigger.new;
    	list<Id> accIdList = new list<id>();
        Map<Id, String> accountMap = new Map<Id,String>();
    	for(contact c: contactList){
            
        	if(c.AccountId != null && (Trigger.isInsert || (Trigger.isUpdate && c.Name != Trigger.oldMap.get(c.ID).Name))){
                accountMap.put(c.accountId,c.name);
            	accIdList.add(c.accountId);
         }
      }
        
    list<account> acc = [SELECT id, name from Account WHERE Id in:accIdList];
    for(Account a: acc){
        a.name = accountMap.get(a.Id);
    }
        
    update acc;
        
   
        
    }
    

}