public Class Divya{

public static List<Student__c> getAllStudent(Id ClassId){
    List<Student__C> stuList = new List<Student__C>();
    for(Student__c stu: [Select id from Student__c where class__c = :ClassId]){
        stuList.add(stu);
    }
    return stuList;
}

public static Map<Class__c,List<Student__c>> getAllStudent(){
    Map<Class__c,List<Student__c>> stuList = new Map<Class__c,List<Student__c>>();
    for(class__c stu: [Select name, (select name from student__r) from class__c]){
        stuList.put(stu,stu.student__r );
    }
    return stuList;
}


private static final List<Boolean> isWorkingDay;
//count of the number of working days in the array
private static final Integer workingDaysInWeek;
static {
    //my real implementation uses the Salesforce BusinessHours Object to populate this array
    isWorkingDay = new List<Boolean> { true, true, true, true, true, false, false };
    //You will have real problems if this number does not match the number of true flags in the array
    workingDaysInWeek = 5;
}

private static final Date monday = Date.newInstance(1900, 1, 3);
private static Integer getDayOfWeek(Date value) {
    return Math.mod(monday.daysBetween(value), 7);
}

public static Integer getDifference(Date  startDate, Date endDate){
if(workingDaysInWeek == 0 || startDate == null || endDate == null) {
        return 0;
    } else {
        Integer difference = startDate.daysBetween(endDate);
        if(difference == 0) {
            //If the 2 dates are the same day check if the day is a working day or not
            return isWorkingDay[getDayOfWeek(startDate)] ? 1 : 0;
        } else if(workingDaysInWeek == 7) {
            //when every day is a working day return the difference
            return difference;
        } else {
            //The guts of the solution
            Integer wholeWeeks = Math.floor(difference / 7).intValue();
            Integer workingDays = wholeWeeks * workingDaysInWeek;
            Integer dayOfWeek = getDayOfWeek(endDate);
            for(Integer remainder = Math.mod(difference, 7); remainder >= 0; remainder--) {
                if(isWorkingDay[dayOfWeek]) {
                    workingDays++;
                }
                dayOfWeek--;
                if(dayOfWeek < 0) {
                    dayOfWeek = 6;
                }
            }
            return workingDays;
        }
        }
        }


}