public class NewCaseListController{

public List<Case> getNewCases(){
    List<case> caseList = new List<Case>([select id, CaseNumber from case where Status = 'New']);
    return caseList;

}
}