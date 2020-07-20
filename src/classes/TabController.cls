public class TabController {
    
    public static String oppSoql = 'select Id, Name, Amount from Opportunity';
	public static List<String> TabStages = new List<String>{'Getting Started','Details', 'Additional Details','Confirmation'};
	public static final String TAB_GETTING_STARTED = 'Getting Started'; 
    
     //------------------------------- METHODS FOR NAO GETTING STARTED COMOPNENT ---------------------------------------
    // For initializing the page parameters ...
    @AuraEnabled
    public static TabDataWrapper initTabData(String recordId){
        system.debug('### recordId : '+ recordId);
        
        TabDataWrapper tabData = new TabDataWrapper();
        try{
            tabData.recordId  = recordId;
            
            // For initializing the client record ...
            String oppSoq = oppSoql + ' Where Id = \''+ tabData.recordId +'\''; 
            system.debug('***oppsoq'+oppSoq);
            tabData.opportunityObj = DataBase.Query(oppSoq);
                        
            // For NAO Path Header ...
            List<TabDataWrapper.TabPathHeaderWrapper> tabpath = new List<TabDataWrapper.TabPathHeaderWrapper>();
            Boolean isVisible=false;
            for(String stage : TabStages){
                if(stage =='Getting Started')
                  isVisible=true;
                 else 
                  isVisible=false;                   
                                    
                tabpath.add(new TabDataWrapper.TabPathHeaderWrapper(stage, false,isVisible));    
            }
           	tabData.pathHeader = tabpath;
            return tabData ;
        }Catch(Exception exp){
            throw new AuraHandledException('Error :'+ exp.getMessage());
        }
    }
    
    
    // For initializing the screens
    @AuraEnabled
    public static TabDataWrapper initSteps(String tabDataStr, String step){
        TabDataWrapper tabData = new TabDataWrapper();
        try{
            tabData = (TabDataWrapper) System.JSON.deserialize(tabDataStr, TabDataWrapper.class);
            system.debug(step + ' ### - initSteps tabData  - '+ tabData );
            
            // For initializing Getting Started screen ...
            if(step == TAB_GETTING_STARTED){
                tabData.gettingStartedObj = new TabDataWrapper.GettingStartedObject();
              
            }
            system.debug('### - initSteps naoData  - '+ tabData );
            return tabData ;
        }Catch(Exception exp){
            System.debug('exp = ' + exp.getStackTraceString());
            throw new AuraHandledException('Error :'+ exp.getMessage());
        }
    }
}