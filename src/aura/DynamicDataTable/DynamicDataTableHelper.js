({
    doInit : function(component, event, helper) {
        helper.calculateTotals(component, event, helper);
        var sortField = component.get("v.sortField");
        if(!$A.util.isEmpty(sortField))
        	helper.sortBy(component, event, helper, sortField );
    },
    
    calculateTotals :  function(component, event, helper) {
    	
        var totals = [];
    	var records = component.get("v.dataList");
        var columnInfos = component.get("v.headerList");
        var showTotal = false;
        for(var indx = 0;indx < columnInfos.length; indx++){
           var columnInfo = columnInfos[indx];
           var total = 0; 
           if(columnInfo && columnInfo.showTotal){
                 for(var dataIndx = 0; dataIndx  < records.length; dataIndx++){
                     	var itemVal = 0;
                        if(records[dataIndx][columnInfo.name] && records[dataIndx][columnInfo.name].toString().includes("%") || records[dataIndx][columnInfo.name].toString().includes("$")) {
                            var replaceStr = records[dataIndx][columnInfo.name].replace(/[^0-9.-]+/g,'');
                            if (!$A.util.isEmpty(replaceStr))
                            	itemVal = parseFloat(replaceStr);
                        }
                        else {
                            itemVal =  $A.util.isEmpty(records[dataIndx][columnInfo.name]) ? 0 : parseFloat(records[dataIndx][columnInfo.name]);
                        }
                     	total += itemVal;
                 }
                 showTotal = showTotal || columnInfo.showTotal;
            }
            if(columnInfo.type == 'currency')
                total = '$' + total.toLocaleString();
            
            else if(columnInfo.type == 'percentage'){
                total = total % records.length;
                total = total + '%';
            }
            
            else if(columnInfo.type == 'calc'){
                total = columnInfo.total;  
            }
            totals.push({"showTotal":columnInfo.showTotal,"total":total});
        }
        
        if(showTotal){
            component.set("v.totalRow", totals);
        }
    },
    
	sortBy: function(component, event, helper, field) {
        var sortAsc = component.get("v.sortAsc"),
            sortField = component.get("v.sortField"),
            records = component.get("v.dataList");
        var columnInfos = component.get("v.headerList");
        var fieldType = 'text';
        for(var columnIndx = 0;columnIndx < columnInfos.length; columnIndx++){
        	if(columnInfos[columnIndx].name == field){
        		fieldType = columnInfos[columnIndx].type;
        	}
        }
        
        sortAsc = field == sortField? !sortAsc: false;
        records.sort(function(a,b){
            var item1, item2;
            if(!$A.util.isEmpty(a[field]) && (a[field].includes("%") || a[field].includes("$"))) {
                item1 = parseFloat(a[field].replace(/[^0-9.-]+/g,''));
            }
            else {
                item1 =  !$A.util.isEmpty(a[field]) ? a[field].toLowerCase() : (fieldType == 'text' || fieldType == 'link') ? '' : 0;
              
            }
            if(!$A.util.isEmpty(b[field]) && (b[field].includes("%") || b[field].includes("$"))) {
            	item2 = parseFloat(b[field].replace(/[^0-9.-]+/g,''));
            }
            else {
                item2 =  !$A.util.isEmpty(b[field]) ? b[field].toLowerCase() : (fieldType == 'text' || fieldType == 'link') ? '' : 0;
            }
            
           
           
           if(fieldType == 'percent'){
        	   return sortAsc ? (item2 - item1) : (item1 - item2);
           }else {
        	   var t1 = item1 == item2,
                t2 = item1 > item2;
        	   return t1? 0: (sortAsc?-1:1)*(t2?-1:1);
           }
        });

        component.set("v.sortAsc", sortAsc);
        component.set("v.sortField", field);
        component.set("v.dataList", records);

    },
})