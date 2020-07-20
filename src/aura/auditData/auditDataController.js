({
    init: function (component, event, helper) {
        helper.createHeader(component, event, helper);
        
        component.set("v.appOption", 'General');
        helper.getUserList(component);
        
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        component.set("v.maxDate", today);
        
        var d = new Date();
        d.setDate(d.getDate()-5);
        var selectedDate = $A.localizationService.formatDate(d, "YYYY-MM-DD");
        component.set("v.selectedDate", selectedDate);
        
        helper.getData(component,event,helper);
    },
    
    handleChange : function(component, event, helper) {
        //component.set("v.rowsToLoad", 50);
        //component.set("v.rowNumberOffset", 0);
        
        //  helper.handleChange(component, event, helper);
        //  helper.getData(component, event, helper);
        // helper.getUserList(component);
    },
    
     loadMoreClicked : function(component, event, helper) {
        
        component.set('v.isloadingData', true);
        component.set('v.loadMore', false);
        //Display "Loading" when more data is being loaded
        //component.set('v.loadMoreStatus', 'Loading...');
        helper.fetchData(component).then($A.getCallback(function (data) {
            var changedList = data;
            console.log('response.getReturnValue()'+JSON.stringify(changedList));
            var records = component.get('v.filteredRecords');
            records = records.concat(changedList);
            component.set('v.filteredRecords', records);
            component.set('v.records', records);
            
            if(changedList.length < component.get("v.rowsToLoad")){
            }else{
        		component.set('v.loadMore', true);
                component.set("v.rowNumberOffset",component.get("v.rowsToLoad") + component.get("v.rowNumberOffset")); 
            }
            component.set("v.rows",records.length); 
            component.set('v.isloadingData', false);
        }));
         
    },
    
    searchClick : function(component, event, helper) {
        component.set("v.rowsToLoad", 50);
        component.set("v.rowNumberOffset", 0);
        helper.getData(component,event,helper);
    },
    
    
    
    
    downloadCsv : function(component,event,helper){
        var filteredRecords = component.get("v.filteredRecords");
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        var filename = 'ChangeHistory_' + utc;   
        var csv = helper.convertArrayOfObjectsToCSV(component,filteredRecords);   
        if (csv == null){	
            return;
            component.set("v.downloadDisabled",false);
        } 
        
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_self';  
        hiddenElement.download = filename+'.csv';  
        document.body.appendChild(hiddenElement); // Required for FireFox browser
        hiddenElement.click(); 
    }, 
    
    filter: function(component, event, helper) {
        component.set('v.isSearchRecords', true);
        var isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            var term = component.find('enter-search').get('v.value');
             var data = component.get("v.records"),
            results = data, regex;
        try {
            regex = new RegExp(term, "i");
            // filter checks each row, constructs new array where function returns true
            results = data.filter(row=>regex.test(row.description),row=>regex.test(row.label),row=>regex.test(row.section),row=>regex.test(row.createdBy),row=>regex.test(row.lastModifiedBy));
        } catch(e) {
            console.log('exception'+e)
        }
        component.set("v.filteredRecords", results);
       
        }
    },
 
})