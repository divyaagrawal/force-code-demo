public class HubEquifaxServiceQueueable implements Queueable, Database.AllowsCallouts {
    
    private String requestBody;
    
    private Integer timeoutSetting;
    
    private Map<String, String> headers = new Map<String, String>{
        'Accept' => 'application/json',
        'Content-Type' => 'application/json'
    };
                
    public HubEquifaxServiceQueueable(String requestBody){
        this.requestBody = requestBody;  
    }
    
    public void execute(QueueableContext context) {
        
        HttpRequest req = new HttpRequest();
        
        HTTPResponse response = new HTTPResponse();
        
        
        Map<String, String> headers = new Map<String, String>{
            'Accept' => 'application/json',
            'Content-Type' => 'application/json'
        };
                    
        for (String header: headers.keySet()) {
            req.setHeader(header, headers.get(header));
        }
        
        req.setMethod('POST');
        req.setEndpoint('callout:FCA_Endpoint');
        req.setTimeout(10000);  
        req.setBody(requestBody);   
        
        system.debug('HTTP Request--->'+req);
        
        response = (new Http()).send(req);
        
        ParseHubEquifaxServiceResponse.parseResponse(requestBody,response);        
        
    }
    
    
    
}