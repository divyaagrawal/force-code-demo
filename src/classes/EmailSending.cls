public class EmailSending {
  
	public static void sendMail(String toMail,String ccMail,String repMail, String subject,String body){
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        string[] to = new string[] {toMail};
        string[] cc = new string[] {ccMail};
        
        email.setToAddresses(to);
        if(ccMail!=null && ccMail != '')
	        email.setCcAddresses(cc);
        if(repmail!=null && repmail!= '')
        	email.setInReplyTo(repMail);
        
        email.setSubject(subject);
        
        email.setHtmlBody(body);
        
        try{
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
        }catch(exception e){
            apexpages.addmessage(new apexpages.message(apexpages.severity.error,e.getMessage()));
        }
    }
}