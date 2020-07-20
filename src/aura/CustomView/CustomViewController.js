({
    init: function (component, event, helper) {

        component.set('v.columns', [
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'Type', fieldName: 'Type', type: 'text'}
        ]);
        
        this.serchClick(component, event, helper);
        
        
       
    },
    
    searchClick : function(component, event, helper) {
        alert('searchClick'+searchClick);
        helper.getData(component,event,helper);
    },
    
    
    handleRowAction : function(component, event, helper){
        var selRows = event.getParam('selectedRows');
        alert('selRows'+selRows);
    },

    
})