public class AccountJSON {
    public List<Account> accList{get;set;}
    public String accJSON{get;set;}
    public AccountJSON(){
        accList = new List<Account>([select id,name from account]);
        accJSON = JSON.serialize(accList);
    }
}