@IsTest(SeeAllData=true)
private class FileUploader_TestMethod
{

     static testmethod void testfileupload(){
         StaticResource testdoc = [Select Id,Body from StaticResource where name ='testMethodCSVUpload'];
         FileUploader  testUpload = new FileUploader();
         testUpload.contentFile= testdoc.Body;
         testUpload.ReadFile();
         testUpload.getuploadedAccounts();
     }
}