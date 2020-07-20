public class DocuSign{
    
    public static void sendEnvelope(String email, String name){
        string accountID = 'bcef0015-9cf9-4b53-b3ef-f94c8eaed3d8';
        String userName = 'techdivadivya@gmail.com';
        String password = '@qwerty20';
        string integratorKey = '0683962e-83c7-455a-ab04-f678b27e6d8c';
        string templateId = 'c980cd98-e419-4635-b2c9-1d3f40ec94e5';
        string endPoint = 'https://demo.docusign.net/restapi/v2/accounts/'+accountID+'/envelopes';
        
        
        //Apex Http Method
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        
        //Authorization header generating using DocuSign credentials. 
        string authorizationHeader = '<DocuSignCredentials><Username>'+userName+'</Username><Password>'+Password+'</Password><IntegratorKey>'+integratorKey+'</IntegratorKey></DocuSignCredentials>';
        req.setHeader('X-DocuSign-Authentication', authorizationHeader);
        req.setHeader('Accept','application/json');
        req.setHeader('Content-Length','162100');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Content-Disposition','form-data');
        
        //JSON Request which contains template id and receivers email and name. 
        
        string json = '{"emailSubject":"Agreement", "emailBlurb":"Sign It", "templateId" : "'+templateID+'",'+
            '"envelopeIdStamping": "false", "templateRoles":[{"roleName":"Signer 1", "name":"'+name+'" , "email":"'+email+'", "recipientId":"1"}],'+
            '"status":"sent"}';

        
        req.setBody(json);
        Http http = new Http();
        HTTPResponse res;
        try{
            res = http.send(req);
            system.debug('DocuSign Response'+ res.getBody());
        }catch(Exception e){
            system.debug('exception'+e);
        }
    }
    
    
}