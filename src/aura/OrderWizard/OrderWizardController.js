({
    
    handleInput : function (cmp, event, helper) {
        var entersearch = cmp.get("{!v.myEnterSearch}");
        var messageempty = (entersearch ===""?" empty":"");
    },
    
    searchKeyChange: function(component, event, helper) {
        component.set("v.rowsToLoad","5");
        component.set("v.rowNumberOffset","0");
        if (event.which == 13){
            helper.searchKeyChange(component, event, helper);
        }
    },
    
    doInit : function(component, event, helper) {
        helper.searchKeyChange(component, event, helper);
    },
    
    
    loadMoreClicked : function(component, event, helper) {
        
        component.set('v.isloadingData', true);
        component.set('v.loadMore', false);
        helper.fetchData(component).then($A.getCallback(function (data) {
            var recordList = data;
            console.log('response.getReturnValue()'+JSON.stringify(recordList));
            var records = component.get('v.records');
            records = records.concat(recordList);
            component.set('v.records', records);
            
            if(recordList.length < component.get("v.rowsToLoad")){
            }else{
                component.set('v.loadMore', true);
                component.set("v.rowNumberOffset",component.get("v.rowsToLoad") + component.get("v.rowNumberOffset")); 
            }
            component.set("v.rows",records.length); 
            component.set('v.isloadingData', false);
        }));
        
    },
    
})