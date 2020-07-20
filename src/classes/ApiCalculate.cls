global class ApiCalculate {
    public Case caseValue {get;set;}
    
    private static ApiCalculate instance = null;
   
    
    public static ApiCalculate getInstance(){ 

        if(instance == null) {
            instance = new ApiCalculate(); 
        }
        return instance; 

    }
  
  private ApiCalculate(){
        
    }
 public void calculationFinal(List<EinsteinMaster.Prediction> apiResult, String des , Case caseValue){
        try{
            
            List<String> arr=new List<String>();
            Map<Double,String> hmap=new Map<Double,String>();
                for(EinsteinMaster.Prediction ep :apiResult){
                    hmap.put(ep.probability,ep.label);
                    arr.add((ep.probability+' '+ep.label));
                    
                }
           // System.debug('arr' + arr);
            String totalprediction = String.join(arr,',');
        
        //System.debug('apiResult' + hmap);
         
           Double maxValue = double.valueOf('0');
            for (Double emap : hmap.keySet()){
                      if (emap > maxValue) {
                         maxValue = emap;
    }
            }
        
        String result = hmap.get(maxValue);
            //System.debug('result' + result);
            
            if(result.equalsIgnoreCase('negative')){
                caseValue.Client_Sentiment__c='Sad';
                
            }else if(result.equalsIgnoreCase('positive')){
                caseValue.Client_Sentiment__c='happy';
                
            }else{
                caseValue.Client_Sentiment__c='Neutral';
            }
            caseValue.Sentiment_Prediction__c	=totalprediction;
              
            Database.DMLOptions dmo = new Database.DMLOptions();
            dmo.assignmentRuleHeader.useDefaultRule = true;
          
            caseValue.setOptions(dmo);
            update caseValue;
          
               
        }catch(Exception e){
            System.debug('Exception '+e);
        }
          
    }

    
    }