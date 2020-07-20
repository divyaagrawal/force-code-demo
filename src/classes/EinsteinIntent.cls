public class EinsteinIntent {
    
    public static final String USER_EMAIL = 'techdivadivya@gmail.com';
    public static string API = 'https://api.einstein.ai/v2';
    public static String LANGUAGE_API = API + '/language';
    public static String SENTIMENT = LANGUAGE_API + '/sentiment';
    public static String INTENT = LANGUAGE_API + '/intent';
    
    public static String VISION_API = API+'/vision';
    public static String PREDICT = VISION_API + '/predict';
    
    
    
    @future(callout = true) 
    public static void getIntent(String sentimentModel , String textforIntent, Id caseId){
       
        try{List<Probabilities> probablity = getProbablities(sentimentModel,textforIntent);
        
        Case caseRec = [Select Id, Description,Intent__c, IntentList__c,SuppliedEmail, SuppliedName  from case where id =:caseId];
        caseRec.Intent__c = probablity[0].label;
        caseRec.IntentList__c = probablity +'';
        upsert caseRec;
        
        system.debug('Case updated '+caseRec);
        
        intentHandling(caseRec,textforIntent);
           }catch(Exception e){
               system.debug('Exception e : '+e.getStackTraceString()+ ' , '+e.getMessage() +' '+e.getLineNumber());
           }
        
        
        
    }
    
    public static void intentHandling(Case caseRec, String textIntent){
        
        List<Case> caseList = [select Id, caseNumber, status, description from Case where SuppliedEmail =: caseRec.SuppliedEmail and id !=: caseRec.Id order by LastModifiedDate desc];
        
        String subject;
        String body;
        
        if(caseList != null && caseList.size() > 0){
            
            system.debug('Case List'+caseList);
            
            String caseStatus = '';
            String caseNumber = '';
            
            for(Case c: caseList){
                if(textIntent.contains(c.caseNumber)){
                    caseStatus = c.Status;
                }
            }
            
            caseStatus = caseList[0].status;
            caseNumber = caseList[0].caseNumber;
            
            
            subject = 'We have received your feedback, with reference ID /#'+caseNumber+', Thank you';
            body = 'Hello '+ caseRec.SuppliedName +',<br /><br />Thank you so much for writing to us.<br /><br /> ';
            body += 'Your staus of the case reference number #'+ caseNumber + 'is '+caseStatus;
            body += '.<br />We will get back to you soon.';
            body += '<br /><br />Thank You!!<br /><br />Regards,<br/>Support Team';
        }else{
            subject = 'We have received your feedback, with reference ID '+caseRec.CaseNumber+', Thank you';
            
            body = 'Hello '+caseRec.SuppliedName +',<br /><br />Thank you so much for writing to us.<br /><br />';
            body += 'We are working on your feedback and have assigned it a reference number /#'+caseRec.CaseNumber;
            body += '.<br />We will get back to you soon.';
            body += '<br /><br />Thank You!!<br /><br />Regards,<br/>Support Team';
        }
        system.debug('Subject '+subject);
        system.debug('Body '+body);
        
        EmailSending.sendMail(caseRec.SuppliedEmail,'','techdivadivya@gmail.com',subject,body);
        system.debug('Email sent successfully');
        
    }
    
    public static List<Probabilities> getProbablities(String sentimentModel , String textforIntent){
        string tokenEndpoint = 'https://api.einstein.ai/v2/oauth2/token';
        String serviceEndPoint = 'https://api.einstein.ai/v2/language/intent';
        
        ContentVersion base64Content = [SELECT  Title, VersionData FROM    ContentVersion WHERE   Title = 'einstein_platform' LIMIT 1 ];
        // Einstein_Settings__mdt einsteinSettings = [Select DeveloperName, Label , Account_Email__c , Service_EndPoint__c , Token_EndPoint__c 
        //                                            from Einstein_Settings__mdt where DeveloperName ='Intent' Limit 1]  ;   
        DateTime tokenExpireTime = DateTime.now().addMinutes(30);
        String tokenExpireTimeinUnixFormate = ''+tokenExpireTime.getTime()/1000;
        
        String keyContents = base64Content.VersionData.tostring();
        keyContents = keyContents.replace('-----BEGIN RSA PRIVATE KEY-----', '');
        keyContents = keyContents.replace('-----END RSA PRIVATE KEY-----', '');
        keyContents = keyContents.replace('\n', '');
        JWT jwt = new JWT('RS256');
        jwt.pkcs8 = keyContents; 
        jwt.iss = 'developer.force.com';
        jwt.sub = USER_EMAIL ;
        jwt.aud = tokenEndpoint;
        jwt.exp = tokenExpireTimeinUnixFormate;
        //String access_token = JWTBearerFlow.getAccessToken(tokenEndpoint, jwt);
        string access_token = 'PJCBWTY3C5CTII2PF52XC7MEJHFKB4OUSVGRELI46OZPFTKUAFIPD3HWTB7LPLHGFGUNXPUJKUTZA7GJPY54ODY657MLVFEMJNWZV2Y';
        Http http = new Http();        
        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        req.setEndpoint(serviceEndPoint);
        req.setHeader('Authorization', 'Bearer ' + access_token);
        req.setHeader('Content-type', 'application/json');        
        String body = '{\"modelId\":\"'+ sentimentModel + '\",\"document\":\"' + textforIntent + '\"}';
        
        req.setBody(body);        
        HTTPResponse res = http.send(req);   
        System.debug('res'+res.getBody());
        System.debug('response'+res);
        JSONParser  parser = JSON.createParser(res.getBody()) ;
        String label ='';
        Decimal probability = 0 ;
        List<Probabilities> probabilities = new  List<Probabilities>() ;
        while (parser.nextToken() != JSONToken.END_OBJECT) {
            if (parser.getCurrentToken() == JSONToken.FIELD_NAME) {
                String text = parser.getText();
                if (parser.nextToken() != JSONToken.VALUE_NULL) {
                    if (text == 'probabilities') {
                        probabilities = new List<Probabilities>();
                        while (parser.nextToken() != JSONToken.END_ARRAY) {
                            probabilities.add(new Probabilities(parser));
                        }
                    }   
                }
            }
        }
        system.debug('probabilities:: '+probabilities);
        return probabilities;
        
    }
    
    public  class Probabilities {
        public String label { get; set; } 
        public Double probability { get; set; }
        public Probabilities(JSONParser parser) {
            while (parser.nextToken() != JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != JSONToken.VALUE_NULL) {
                        if (text == 'label') {
                            label = parser.getText();
                        } else if (text == 'probability') {
                            probability = parser.getDoubleValue();
                        }  
                    }
                }
            }
        }
    }

    
}