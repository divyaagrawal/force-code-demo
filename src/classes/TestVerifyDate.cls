@isTest
public class TestVerifyDate {

   @isTest static void testWarmTemp() {
       String returnValue = String.valueOf(VerifyDate.CheckDates(Date.newInstance(2018,2,15),Date.newInstance(2018,2,20)));
       String returnValue1 = String.valueOf(VerifyDate.CheckDates(Date.newInstance(2018,2,15),Date.newInstance(2018,4,20)));
    }
}