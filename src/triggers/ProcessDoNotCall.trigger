trigger ProcessDoNotCall on Contact (after update){
  system.debug('Inside ProcessDoNotCall trigger');
List<Contact> lstCon = [SELECT Id, FirstName, Department
FROM Contact
WHERE Id IN :Trigger.new];
for(Contact c : lstCon)
c.FirstName= 'fname';
update lstCon;
    system.debug('lstCon'+lstCon);
}