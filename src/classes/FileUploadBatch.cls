global with sharing class FileUploadBatch implements Database.batchable<String>, Database.Stateful
{
   public string nameFile{get;set;}
    public Blob contentFile{get;set;}
    String[] filelines = new String[]{};
    List<Account> accstoupload;
 
    public Pagereference ReadFile()
    {
     FileUploadBatch c = new FileUploadBatch();
     Database.executeBatch(c);
        return null;
    }
    

   global Iterable<String> start(Database.batchableContext batchableContext)
   { 
        try{
        System.debug('Start Method');
                //Convert the uploaded file which is in BLOB format into a string
                nameFile =blobToString( contentFile,'ISO-8859-1');
                
                //Now sepatate every row of the excel file
                filelines = nameFile.split('\n');  
                System.debug('Start Method End');
         }
         catch(Exception e){
                 System.debug('exception' + e);
         } 
       return filelines;
   }
   global void execute(Database.BatchableContext batchableContext, List<String> filelines)  
   {
       try{
           //Iterate through every line and create a Account record for each row
           
            System.debug('Execute Method End');
            
                accstoupload = new List<Account>();
                for (Integer i=1;i<filelines.size();i++)
                {
                    String[] inputvalues = new String[]{};
                    inputvalues = filelines[i].split(',');
                    
                    Account a = new Account();
                    a.Name = inputvalues[0];
                    a.ShippingStreet = inputvalues[1];       
                    a.ShippingCity = inputvalues[2];
                    a.ShippingState = inputvalues[3];
                    a.ShippingPostalCode = inputvalues[4];
                    a.ShippingCountry = inputvalues[5];
        
                    accstoupload.add(a);
                   
                }
            insert accstoupload;
        }
        catch (Exception e)
        {
           
        }    
   }
   global void finish(Database.BatchableContext batchableContext)
   {
       
   }
    
    
    /**** This function sends back to the visualforce page the list of account records that were inserted ****/ 
    public List<Account> getuploadedAccounts()
    {
        if (accstoupload!= NULL)
            if (accstoupload.size() > 0)
                return accstoupload;
            else
                return null;                    
        else
            return null;
    }  
        /**
         This function convers the input CSV file in BLOB format into a string
        @param input    Blob data representing correct string in @inCharset encoding
        @param inCharset    encoding of the Blob data (for example 'ISO 8859-1')
     */
    public String blobToString(Blob input, String inCharset){
        String hex = EncodingUtil.convertToHex(input);
        System.assertEquals(0, hex.length() & 1);
        final Integer bytesCount = hex.length() >> 1;
        String[] bytes = new String[bytesCount];
        for(Integer i = 0; i < bytesCount; ++i)
            bytes[i] =  hex.mid(i << 1, 2);
        return EncodingUtil.urlDecode('%' + String.join(bytes, '%'), inCharset);
    }       

    
}