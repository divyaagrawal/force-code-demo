trigger ass4_contact_hindi_teacher on Contact (before insert,before update) {
for(Contact con: Trigger.new){
if(con.Subjects__c.containsIgnoreCase('Hindi'))
con.addError('hindi teacher can\'t editted');
}
}