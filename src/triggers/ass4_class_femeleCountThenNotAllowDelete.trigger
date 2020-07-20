trigger ass4_class_femeleCountThenNotAllowDelete on Class__c (before delete,after insert, after update) {
for(Class__c cla: Trigger.new){
if(cla.No_of_Female_Student__c > 0){
cla.addError('already had female student');
}
}
}