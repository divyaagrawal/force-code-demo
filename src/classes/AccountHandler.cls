public class AccountHandler{
    public static Account insertNewAccount(String accName){
     if(String.isBlank(accName)){
     return null;
     }else{
     Account acc = new Account(Name=accName);
     insert acc;
     return acc;
     }
    }


}