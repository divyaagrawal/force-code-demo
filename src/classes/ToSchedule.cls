global class ToSchedule implements Schedulable{
    global void execute(SchedulableContext sc){
        List<Messaging.SingleEmailMessage> mailList = new List<Messaging.SingleEmailMessage>();
        for(Opportunity opp :[SELECT id,ownerId,owner.Email FROM Opportunity WHERE LastModifiedDate < last_N_Days :30 limit 15]){
            Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
			message.toAddresses = new String[] { opp.owner.email};
			message.subject = 'opp not editdfcv ';	
			message.plainTextBody = 'she is mad.'+opp.id;
            mailList.add(message);
        }
        Messaging.SendEmailResult[] results = Messaging.sendEmail(mailList);

if (results[0].success) {
    System.debug('The email was sent successfully.');
} else {
    System.debug('The email failed to send: ' + results[0].errors[0].message);
}
    }
    
    public static void executeFunction(){
        ToSchedule toSchedule = new ToSchedule();
        String sch = '0 46 9 1/1 * ? *';
        system.schedule('mailp', sch, toSchedule);
    }
    
}