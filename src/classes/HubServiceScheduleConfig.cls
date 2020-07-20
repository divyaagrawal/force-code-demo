public class HubServiceScheduleConfig {
    
  /*  public List<String> ScheduletheHubServiceJob(){
        
        // interval in minutes you want apex to schedule ie. 2, 3, 5, 10, 15
        Integer frequency = integer.ValueOf(Label.HubServiceScheduleFrequency);
        
        Integer totalIterations = 60/frequency - 1;
        
        List<String> jobIds = new List<String>();
        
        for(Integer i = 0; i <= totalIterations; i++){
            
            Integer count = i*frequency;
            String minuteString = (count < 10) ? '0' + count : '' + count;
            String jobid = System.schedule('Scheduled Job ' + i,  '0 ' + minuteString + ' * * * ?', new HubServiceSchedulable());
        	jobIds.add(jobid);
        }
        
        return jobIds;
        
    }
    */
}