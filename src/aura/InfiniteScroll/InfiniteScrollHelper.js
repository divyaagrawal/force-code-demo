({
    getData : function(component) {
        
        var action = component.get("c.getBooks");
        action.setParams({
            "limits": component.get("v.initialRows"),
            "offsets": component.get("v.rowNumberOffset")
        });
        action.setCallback(this, function(a) {
            component.set("v.data", a.getReturnValue());
            component.set("v.currentCount", component.get("v.initialRows"));
            
        });
        $A.enqueueAction(action);
    },
    sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.data");
        var reverse = sortDirection !== 'asc';
        //sorts the rows based on the column header that's clicked
        data.sort(this.sortBy(fieldName, reverse))
        cmp.set("v.data", data);
    },
    sortBy: function (field, reverse, primer) {
        var key = primer ?
            function(x) {return primer(x[field])} :
        function(x) {return x[field]};
        //checks if the two rows should switch places
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },
    fetchData: function(component , rows){
        return new Promise($A.getCallback(function(resolve, reject) {
            var currentDatatemp = component.get('c.getBooks');
            var counts = component.get("v.currentCount");
            currentDatatemp.setParams({
                "limits": component.get("v.initialRows"),
                "offsets": counts 
            });
            currentDatatemp.setCallback(this, function(a) {
                resolve(a.getReturnValue());
                var countstemps = component.get("v.currentCount");
                countstemps = countstemps+component.get("v.initialRows");
                component.set("v.currentCount",countstemps);
                
            });
            $A.enqueueAction(currentDatatemp);
            
            
        }));
        
    } ,
    updateBooks: function (cmp) {
        var rows = cmp.get('v.data');
        var activeFilter = cmp.get('v.activeFilter');
        console.log('activeFilter Helper'+activeFilter)
        var filteredRows = rows;
        if (activeFilter == 'All') {
            return  rows; 
        }
        if (activeFilter !== 'All') {
            filteredRows = rows.filter(function (row) {
                console.log('Each Row'+row.publish_status__c);
                if(row.publish_status__c == activeFilter){
                    return  row; 
                }
                // return (activeFilter === 'In_Completed') ||(activeFilter === 'Pre_Order');
            });
        }
        cmp.set('v.data', filteredRows);
    },
    
})