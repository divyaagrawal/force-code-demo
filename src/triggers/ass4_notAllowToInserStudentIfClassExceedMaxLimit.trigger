trigger ass4_notAllowToInserStudentIfClassExceedMaxLimit on Student__c (before insert,after insert, after update) {
Set<Id> classId = new Set<Id>();
Set<Id> classAllId = new Set<Id>();
for(Student__c stu: Trigger.new)
{
   classId.add(stu.class__c);
}

Map<Id,Class__c> classMap = new Map<Id,Class__c>([select NumberOfStudents__c,id,Maxsize__c from Class__c where Id in:classId]);

for(Student__c stu: Trigger.new)
{
   classAllId.add(stu.class__c);
   if(classMap.containsKey(stu.class__c) && classMap.get(stu.class__c).NumberOfStudents__c >= classMap.get(stu.class__c).Maxsize__c){
   stu.addError('class full');
   }
   
}


for(Student__c stu: Trigger.old)
{
   classAllId.add(stu.class__c);
}


for(Class__c cla:[select myCount__c, (select id from student__r) from class__c where id in:classAllId]){
    cla.myCount__c = cla.student__r.size();
    update cla;

}



}