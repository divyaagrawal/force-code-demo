public class AssOppPageController {
public List<Opportunity> oppList{get; set;}

public AssOppPageController(){
//oppList = [select name, amount from opportunity];

/*
oppList = [select sum(amount) from opportunity group by account];
*/

 oppList = new List<Opportunity>();
AggregateResult[] groupedResults = [SELECT accountId, AVG(Amount) amt FROM Opportunity GROUP BY AccountId];
for (AggregateResult ar : groupedResults) { 
Opportunity opp = new Opportunity();
opp.amount =  (Decimal)(ar.get('amt'));
opp.Accountid = (Id)ar.get('accountId');
oppList.add(opp);
}


}

}