@isTest
global class HubEquifaxTestMock implements HttpCalloutMock {
    // Implement this interface method
    global HTTPResponse respond(HTTPRequest req) {
        String body;
        String requestString = req.getBody();
        
        List<Account> accountList = [Select Id from Account ];
        
        if(requestString.equalsIgnoreCase('Success Data Records')){
            
             body = '{\"creditScoreResList\":[{\"auditId\":\"898924403\",\"returnCode\":\"0\",\"returnMsg\":\"OK\",\"transactionID\":\"'+accountList[0].Id+'\"},{\"auditId\":\"898924404\",\"returnCode\":\"1\",\"returnMsg\":\"UNABLE TO PROCESS\",\"transactionID\":\"'+accountList[1].Id+'\"},{\"auditId\":\"1000024403\",\"returnCode\":\"2\",\"returnMsg\":\"DATA NOT FOUND\",\"transactionID\":\"'+accountList[2].Id+'\"}]}';

        }else if(requestString.equalsIgnoreCase('Success Data Record')){
            
             body = '{\"creditScoreResList\":[{\"auditId\":\"898924403\",\"returnCode\":\"0\",\"returnMsg\":\"OK\",\"transactionID\":\"'+accountList[0].Id+'\"}]}';

        }
        else{
            body = '{\"creditScoreResList\":[{\"auditId\":\"898924403\",\"returnCode\":\"0\",\"returnMsg\":\"OK\",\"transactionID\":\"7866767868\"},{\"auditId\":\"898924404\",\"returnCode\":\"1\",\"returnMsg\":\"UNABLE TO PROCESS\",\"transactionID\":\"7866767868\"},{\"auditId\":\"1000024403\",\"returnCode\":\"2\",\"returnMsg\":\"DATA NOT FOUND\",\"transactionID\":\"131241224\"}]}';
        }
        
        // Optionally, only send a mock response for a specific endpoint
        // and method.
        //System.assertEquals('http://example.com/example/test', req.getEndpoint());
        //System.assertEquals('GET', req.getMethod());
        
        // Create a fake response
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(body);
        res.setStatusCode(200);
        return res;
    }
}