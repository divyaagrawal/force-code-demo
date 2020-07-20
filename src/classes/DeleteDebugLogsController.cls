public class DeleteDebugLogsController {
    @AuraEnabled
    public static String deleteLogs(){
        system.debug('In deleteLogs method');
        String responseMsg = '';
        //system.debug('URL::'+ 'callout:OWNINSTANCE/services/data/v39.0/limits');
        try{
            deleteLogFuture();
           // responseMsg = loglist.size() + 'Logs deleted successfully';
        }catch(DMLException e){
            system.debug('Exception :: '+e.getMessage()+ ' , '+e.getStackTraceString());
            responseMsg = e.getMessage();
        }catch(Exception e){
            system.debug('Exception :: '+e.getMessage()+ ' , '+e.getStackTraceString());
            responseMsg = e.getMessage();
        }
        system.debug('responseMsg ::'+responseMsg);
        return responseMsg;
    }
    
    @Future(callout=true)
    public static void deleteLogFuture(){
        System.debug('Inside future method');
        List <Apexlog> loglist = [Select Id from Apexlog limit 100];
            for(Apexlog al: loglist){
                
                Http h = new Http();
                HttpRequest req = new HttpRequest();
                req.setEndpoint(Url.getOrgDomainUrl().toExternalForm()
                + '/services/data/v44.0/sobjects/Apexlog/'+al.Id);
                req.setMethod('DELETE');
                req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
                HttpResponse response = h.send(req);
                System.debug('response'+response);
                System.debug(response.getStatus());
                System.debug(response.getStatusCode());
                
            }
           // responseMsg = loglist.size() + 'Logs deleted successfully';
    }
    
    @AuraEnabled
    public static String fetchNoOfLogs(){
        String responseMsg = '';
        try{
            List <Apexlog> loglist = [Select Id from Apexlog limit 100];
            responseMsg = loglist.size()+'';
            
            system.debug('first url : '+Url.getOrgDomainUrl().toExternalForm());

        }
        catch(Exception e){
            system.debug('Exception :: '+e.getMessage()+ ' , '+e.getStackTraceString());
            responseMsg = e.getMessage();
        }
        return responseMsg;
    }
    
    
    public class DeleteLog{
        @AuraEnabled
        public string statusMessage;
        
        @AuraEnabled
        public string noOflogs;
        
        @AuraEnabled
        public string status;
    }
       
    
   /*  @AuraEnabled
    public static String deleteLogs(){
        system.debug('In deleteLogs method');
        String responseMsg = '';
        try{
            List <Apexlog> loglist = [Select Id from Apexlog limit 100];
            for(Apexlog al: loglist){
                Http h = new Http();
                HttpRequest req = new HttpRequest();
                req.setEndpoint(Url.getOrgDomainUrl().toExternalForm()
                                + '/services/data/v44.0/sobjects/Apexlog/'+al.Id);
                req.setMethod('DELETE');
                req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
                HttpResponse res = h.send(req);
                System.debug(res.getStatusCode());
                
            }
            responseMsg = loglist.size() + 'Logs deleted successfully';
        }catch(DMLException e){
            system.debug('Exception :: '+e.getMessage()+ ' , '+e.getStackTraceString());
            responseMsg = e.getMessage();
        }catch(Exception e){
            system.debug('Exception :: '+e.getMessage()+ ' , '+e.getStackTraceString());
            responseMsg = e.getMessage();
        }
        system.debug('responseMsg ::'+responseMsg);
        return responseMsg;
    } */
    
   
    
}