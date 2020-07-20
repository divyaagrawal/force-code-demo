({
    getData : function(component,event,helper) {
        
        var action = component.get('c.getChangedList');
        var selectedDate = component.get("v.selectedDate");
        var selectedUser = component.get("v.selectedUser");
        var appOption = component.get("v.appOption");
        component.set('v.loadMore', false);
        component.set('v.varSpinnerCls', 'slds-show');
        component.set('v.isSearchRecords', false);
        
        action.setParams({ "appOption" : component.get("v.appOption"),
                          "selectedUser" : selectedUser,
                          "selectedDate" : selectedDate,
                          "limits": component.get("v.rowsToLoad"),
                          "offsets": component.get("v.rowNumberOffset")});
        action.setCallback(this, $A.getCallback(function (response) {
            component.set('v.varSpinnerCls', 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") {
                debugger;
                var changedList = response.getReturnValue();
                console.log('response.getReturnValue()'+JSON.stringify(response.getReturnValue()));
                component.set('v.filteredRecords', changedList);
                component.set('v.records', changedList);
                
                if(changedList.length < component.get("v.rowsToLoad")){
                    component.set('v.enableInfiniteLoading', false);
                    //component.set('v.loadMoreStatus', 'No more data to load');
                    component.set('v.loadMoreStatus', '');
                    component.set('v.loadMore', false);
                }else{
                    component.set("v.rowNumberOffset",component.get("v.rowsToLoad") - 1); 
                   	component.set('v.loadMore', true);
                    component.set('v.loadMoreMsg', 'Load more data...');
                    // component.set('v.enableInfiniteLoading', true);
                }
                component.set("v.rows",changedList.length); 
                
                //component.set('v.enableInfiniteLoading', true);
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
            
        }));
        $A.enqueueAction(action);
        
    },
    
    getUserList : function(component) {
        var action = component.get('c.getUserList');
        var appOption = component.get("v.appOption");
        component.set('v.varSpinnerCls', 'slds-show');
        action.setCallback(this, $A.getCallback(function (response) {
            component.set('v.varSpinnerCls', 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") {
                debugger;
                var userList = response.getReturnValue();
                console.log('response.getReturnValue()'+JSON.stringify(response.getReturnValue()));
                component.set('v.userList', userList);                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
            
        }));
        $A.enqueueAction(action);
        
    },
    
    createHeader : function(component, event, helper) {
        var appOption = component.get("v.appOption");
        
            component.set('v.mycolumns', [
                { label: 'Created By', fieldName: 'createdBy', type: 'text'},
                { label: 'Created Date', fieldName: 'createdDate', type: 'date-local'},
                { label: 'Label', fieldName: 'label', type: 'text'},
                 { label: 'Section', fieldName: 'section', type: 'text'},
                 { label: 'Description', fieldName: 'description', type: 'text'},
                 { label: 'Is Deleted', fieldName: 'isDeleted', type: 'boolean', cellAttributes: { alignment: 'right' }},
                { label: 'Last Modified By', fieldName: 'lastModifiedBy', type: 'text'},
				{ label: 'Last Modified Date', fieldName: 'lastModifiedDate', type: 'date'},
              ]);
        console.log('appOption',appOption);
    },
    
    fetchData: function(component){
                var selectedDate = component.get("v.selectedDate");
        var selectedUser = component.get("v.selectedUser");
        var appOption = component.get("v.appOption");
                
        return new Promise($A.getCallback(function(resolve, reject) {
            var action = component.get('c.getChangedList');
            action.setParams({ "appOption" : component.get("v.appOption"),
                              "limits": component.get("v.rowsToLoad"),
                              "offsets": component.get("v.rowNumberOffset"),
               				"selectedUser" : selectedUser,
                          "selectedDate" : selectedDate});
            action.setCallback(this, function(a) {
                resolve(a.getReturnValue());
            });
            $A.enqueueAction(action);
        }));
        
    } ,    
    
    convertArrayOfObjectsToCSV : function(component,objectRecords){
      
        var csvStringResult, counter, keys, columnDivider, lineDivider,parentKeys;
        if (objectRecords == null || !objectRecords.length) {
            return null;
        }
        columnDivider = ',';
        lineDivider =  '\n'; 
        keys = ['createdBy','createdDate','label','section' ,'description','isDeleted','lastModifiedBy','lastModifiedDate','apiVersion','nameSpace','language','delegateUser'];
        parentKeys = ['Created By', 'Created Date', 'Label','Section','Description','Is Deleted','Last Modified By','Last Modified Date','Api Version','Namespace','Language','Delegate User'];
        
        csvStringResult = '';
        csvStringResult += parentKeys.join(columnDivider);
        csvStringResult += lineDivider;
        counter = 0;
        
        for(var i=0; i < objectRecords.length; i++){   
            counter = 0;
            for(var sTempkey in keys) {
                var skey = keys[sTempkey] ;  
                if(counter > 0){ 
                    csvStringResult += columnDivider; 
                }   
                if(typeof objectRecords[i][skey] !== 'undefined' ){
                     csvStringResult += '"'+ objectRecords[i][skey]+'"'; 
                }else{
                     csvStringResult += ''; 
                }
               
                counter++;
            }
            csvStringResult += lineDivider;
        }
        
        // return the CSV formate String 
        return csvStringResult;        
    },
    
    
})