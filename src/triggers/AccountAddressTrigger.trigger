trigger AccountAddressTrigger on Account (before insert,before update ) {
for(Account ac:Trigger.new){
    if(ac.Match_Billing_Address__c == true){
    ac.ShippingPostalCode  = ac.BillingPostalCode;
    
    }

}


}