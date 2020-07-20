public class CustomAccountDetailsController{

    public ApexPages.StandardSetController con{get; set;} 
    public String BillingCity { get; set;}
    public String BillingState { get; set;}
    public String BillingCountry { get; set;}
    
    public CustomAccountDetailsController(){
         filterAccount = new List<Account>();
        search();
    }
    
    public PageReference search() {
        String st = 'select Name, AccountNumber, BillingCity,BillingState,BillingCountry from Account where id != null ';

if(BillingCity != null && BillingCity != ''){
st += ' and BillingCity =:BillingCity ';
}

if(BillingState != null && BillingState != ''){
st += ' and BillingState =:BillingState ';
}

if(BillingCountry != null && BillingCountry != ''){
st += ' and BillingCountry =:BillingCountry ';
}


con = new ApexPages.StandardSetController(Database.getQueryLocator(st)); 
            con.setPageSize(5);
        return null;
    }


    public List<Account> filterAccount{
     get  
        {  
            if(con != null)  
                return (List<Account>)con.getRecords();  
            else  
                return null ;  
        }  
        set;
}

 public Boolean hasNext  
    {  
        get  
        {  
            return con.getHasNext();  
        }  
        set;  
    }  
    public Boolean hasPrevious  
    {  
        get  
        {  
            return con.getHasPrevious();  
        }  
        set;  
    }  
    public Integer pageNumber  
    {  
        get  
        {  
            return con.getPageNumber();  
        }  
        set;  
    }  
    public void previous()  
    {  
        con.previous();  
    }  
    public void next()  
    {  
        con.next();  
    }  


}