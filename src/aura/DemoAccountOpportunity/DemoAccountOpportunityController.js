({
    init: function (component, event, helper) {
        
          component.set('v.mycolumns', [
                { label: 'Id', fieldName: 'Id', type: 'text'},
                { label: 'Count', fieldName: 'count', type: 'text'},
              ]);
              
         
        helper.getData(component,event,helper);
    },
   
    
})