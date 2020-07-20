public class generatePDFExt {

    public generatePDFExt(ApexPages.StandardController controller) {

    }

    public PageReference savePDF(){
        String parentId = ApexPages.currentPage().getParameters().get('id');
        List<Attachment> attachList =  new List<Attachment>([select id from Attachment where parentId = :parentId]);
        delete attachList;
        PageReference pdf = Page.studentDeatails;
        pdf.getParameters().put('id',parentId);
        Attachment attach = new Attachment();
        Blob body;
        try {
            body = pdf.getContent();
        } catch (VisualforceException e) {
            body = Blob.valueOf('Some Text');
        }
        attach.Body = body;
        attach.Name = 'Student Detail';
        attach.IsPrivate = false;
        attach.ParentId = parentId;
        insert attach;
        return new PageReference('/'+parentId);
    }

}