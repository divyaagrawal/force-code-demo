global class HubServiceSchedulable implements Schedulable {

   global void execute(SchedulableContext ctx) {
       
       System.debug('Inside HubServiceSchedulable execute method');
      
       List<Account> accountList = [Select Id from Account];
       system.debug('@@accountList '+accountList);
       if(accountList != null && accountList.size() > 0){
            System.debug('Running batch class for the accountList Size '+accountList.size());
           Id batchJobId = Database.executeBatch(new HubEquifaxServiceBatch(), 10);
       }
       
   }   
}