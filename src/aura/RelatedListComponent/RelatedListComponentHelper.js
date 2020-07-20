({
    fetchUserInfo: function(cmp, event, helper){
        console.log('In related list helper');
        var relatedList = []; 
        
        helper.toggleSpinner(cmp, event, 'slds-show');
        try{
            var divId = cmp.find("recordsGrid");
            var action = cmp.get("c.getList"); 
            action.setParams({
            "recId": cmp.get("v.recordId"),
            "sObjectName": cmp.get("v.sObjectName")
       	    });
            action.setCallback(this, function(data) {
               var retVal = data.getReturnValue();
               if(!$A.util.isEmpty(retVal)){
                    console.log('### -getList - '+ retVal);
                        var jsonRecordArray = JSON.parse(retVal);
                        if(!$A.util.isEmpty(jsonRecordArray)) {
                        try{
                            for(var relatedListIndex = 0; relatedListIndex < jsonRecordArray.length; relatedListIndex++){
                                    var relatedRecord = jsonRecordArray[relatedListIndex];
                                    relatedList.push(relatedRecord);
                            }
                            
                            cmp.set("v.recordsList", relatedList);
                            helper.initAccDataGrid(cmp, event, helper);	
                        }catch(e){
                            helper.toggleSpinner(cmp, event, 'slds-hide');
                            console.log('Error' + e.message);
                        } 
                    }
                }else{
                     console.log('Empty Response ');
                }
            });
            $A.enqueueAction(action);
        }catch(e){
            helper.toggleSpinner(cmp, event, 'slds-hide');
            console.log('Error' + e.message);
        }
    },
    
     initAccDataGrid : function(cmp, event, helper) {	
        var divId = cmp.find("recordsGrid");
        var recordsList = cmp.get("v.recordsList");
        console.log(' initFinAccDataGrid recordsList '+ recordsList);
        var headerList = helper.initColumnConfig(cmp, event, helper, recordsList);        
        $A.createComponent("c:DynamicDataTable", {
            "headerList":headerList,
            "dataList": recordsList,
            "hasRowActions" : false,
        }, function (contentComponent, status, error) { 
            helper.toggleSpinner(cmp, event, 'slds-hide');
            if (status === "SUCCESS") {
                divId.set('v.body', contentComponent);
                console.log('data grid created');
            } else {
                console.log('data grid error');
                throw new Error(error);
            }
        });
    },
    
     //hold Investment Account  table columns headers labels
    initColumnConfig: function(cmp, event, helper, recordsList) {
        var sObjectName = cmp.get("v.sObjectName");
        var headerList;
        if(sObjectName === "Contact") {
            headerList = [
                {label:"Id", name:"Id", type:"text"},
                {label:"Name", name:"Name", type:"text"},
                {label:"Email", name:"Email", type:"text"},
                {label:"Phone", name:"Phone", type:"text"},
               ];
        }
        else if(sObjectName === "Opportunity") {
            headerList = [
                {label:"Id", name:"Id", type:"text"},
                {label:"Name", name:"Name", type:"text"},
                {label:"Amount", name:"Amount", type:"text"},
                {label:"StageName", name:"StageName", type:"text"},
               ];
        }
        return headerList;
    },
    
    
    
    
    /*
                
    // method to fetch client, household or data table  data
    fetchFinAccInfo: function(cmp, event, helper){
        var profileInfo = cmp.get("v.profileInfo");
        var retailPlanDataList = []; 
        console.log('fAccountType: ' + fAccountType);
        var action = cmp.get("c.getFinAccountData"); 
        action.setParams({
            "recId": cmp.get("v.recordId"),
            "sObjectName": cmp.get("v.sObjectName")
        });
        action.setCallback(this, function(resp) {
            var res = resp.getReturnValue();
            //console.log('###-- res '+ res);
            if(!$A.util.isEmpty(res)){
                var relatedList = JSON.parse(res);
                console.log('###-- relatedList '+ relatedList);
                if(!$A.util.isEmpty(relatedList)){
                    for(var index = 0; index < relatedList.length; index++){
                        var relatedRecord = relatedList[index].client;
                         if(!$A.util.isEmpty(relatedRecord)){
                                for(var retailPlanIndex = 0; retailPlanIndex < retailPlans.length; retailPlanIndex++){
                                    var retailPlan = retailPlans[retailPlanIndex];
                                    var retailPlanData = helper.initPlanAccount(retailPlan, client, profileInfo);
                                    retailPlanDataList.push(retailPlanData);
                                }
                            }
                        
                    }
                    //cmp.set("v.allAccountInfo", helper.addRowAction(cmp, event, helper, retailPlanDataList));
                    cmp.set("v.allAccountInfo", retailPlanDataList);
                }
                helper.initFinAccDataGrid(cmp, event, helper);	
            }else{
                console.log('Failed to Intialize Dashboard Detail' + resp);
            }
        });
        $A.enqueueAction(action);
    },
    
    //intiates wrapper Object account  
    initPlanAccount: function(accountPlan, client, profileInfo){
        var faList =  accountPlan.financialAcctList;
        var fa = ($A.util.isEmpty(faList) || faList.length == 0) ? null : faList[0];
        
        var gfInd = $A.util.isEmpty(fa) ? "" : fa.Grandfathered__c;
        var faId =  $A.util.isEmpty(fa) ? "" : fa.Id;
        var nna =  ($A.util.isEmpty(fa) || $A.util.isEmpty(fa.Prior_12_Month_Net_New_Assets__c)) ? "" : fa.Prior_12_Month_Net_New_Assets__c;
        var gdc =  ($A.util.isEmpty(fa) || $A.util.isEmpty(fa.Prior_12_Month_GDC__c)) ? "" : fa.Prior_12_Month_GDC__c;
        var disc = $A.util.isEmpty(fa) ? false : fa.Advisory_Discretion__c;
        var model =  $A.util.isEmpty(fa) ? "" : fa.Wealth_Management_Model__c;
        var roa =  ($A.util.isEmpty(fa) || $A.util.isEmpty(fa.Prior_12_Month_ROA__c))? "" : fa.Prior_12_Month_ROA__c;
        var cash =  ($A.util.isEmpty(fa) || $A.util.isEmpty(fa.Money_Market_Balance__c))? "" :  fa.Money_Market_Balance__c.toLocaleString();
        var managmentName = $A.util.isEmpty(fa) ? "" : fa.Management_Name__c;
        //var interactionURL =  $A.util.isEmpty(accountPlan.sendToInteractionURL) ? this.prepareRecordInteractionUrl(accountPlan.dataSource == 'EPS'? 'eps' :'ras',client.Id, faId, profileInfo.profileName, accountPlan.planId, accountPlan.unformattedAccountValue, accountPlan.servicingRepId): accountPlan.sendToInteractionURL;
        
        //var parsedRoa = this.parseROA(roa);
        //var formatNna= "$"+ this.numberWithCommas(nna);    
        //var formatGdc= "$"+ this.numberWithCommas(gdc);
        //var formatCash= '$' + this.numberWithCommas(cash);
        
        var convertManagementNameToUppeCase = '';
        if (null != managmentName && managmentName != '')
            convertManagementNameToUppeCase = managmentName.toUpperCase();
        var sponsor = convertManagementNameToUppeCase;
        
        if(convertManagementNameToUppeCase == 'PERSHING'){
            if(faList[0].Advicory_Account__c == 'Yes'){
                sponsor = 'ADVISORY';
            }else {
                sponsor = 'BROKERAGE';
            }
        } 
        
        // Code block added for case 23919  Ends here
        var accountData = {
            "clientId":client.Id, 
            "name": client.Name,
            "clientLastName": client.LastName, 
            "clientSSN": client.SSN__c,
            "faId": faId,
            "accountType":accountPlan.accountType,
            "accountNumber": accountPlan.accountNumber,
            "balance":accountPlan.accountValue,
            //"cash":formatCash,
            "planId": accountPlan.planId, 
            "planName":  accountPlan.planName,
            //"sponsor": sponsor, 
            //"discretionInd": disc, 
            //"gfInd" : gfInd,
            //"repName": accountPlan.servicingRepName,
            //"repCode": accountPlan.servicingRepId,
            //"model": model, 
            //"nna" : formatNna,
            //"gdc" : formatGdc,
            //"roa" : parsedRoa,
            "dataSource" : accountPlan.dataSource,
            "dataSourceOrig" : accountPlan.dataSourceOrig,
            "financialAccount" : $A.util.isEmpty(fa) ? "" : fa,
            //"employmentStatus" :accountPlan.employmentStatus,
            //"managedAccount" : accountPlan.managedAccount,
            //"interactionURL": interactionURL,
            //"managmentName": managmentName,
            "participantName":client.Name,
            "planNumber" : accountPlan.planNumber,
            "participantId" :accountPlan.partAgreementSystemKey
            
        };
        return accountData;
    },
    parseROA : function(roa) {
        var formatRoa= '' ;
        try{
            if( roa != null  && roa != ''){
                formatRoa = ((parseFloat(roa) * 100).toFixed(2)).toString() + '%';
                return formatRoa;
            }
            else{
                formatRoa=roa;
            }
        }
        catch(e){
            console.error( 'error in parseROA method due to =: '+e.message);   
        }
        return formatRoa;
    },
    numberWithCommas : function (convNnaOrGdc) {
        try{
            if(convNnaOrGdc != null && convNnaOrGdc != ''){
                return convNnaOrGdc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }else{
                return 0;
            }
        }catch(e){
            console.error( 'error in numberWithCommas method due to =: '+e.message);   
        }
        return convNnaOrGdc;   
    },
    prepareRecordInteractionUrl :function (requestFrom, clientId, whatId, profileName, planId, atRisk, servicingRepId){
        var interactionUrl = '/apex/RRRecordInteractionPage?requestFrom='+requestFrom+'&accountId='+clientId;
        interactionUrl +='&whatId='+whatId+'&retURL=/'+whatId+'&profileName='+ profileName+'&planId='+ planId+'&ent=Task';
        if(!$A.util.isEmpty(atRisk))
            interactionUrl += '&atRisk=' + atRisk;
        if(!$A.util.isEmpty(servicingRepId))
            interactionUrl += '&AgentTIN=' + servicingRepId;
        
        return interactionUrl;
    },
    // add actions in the action column from the data table depending on the account data source
    addRowAction : function(cmp, event, helper, allAccountInfo) {
        var profileInfo = cmp.get("v.profileInfo");
        for(var index = 0; index < allAccountInfo.length; index++){
            var rowActions = [];
            var account = allAccountInfo[index];
            if(account && account.dataSource == 'RETAIL' && !$A.util.isEmpty(account.faId) && !$A.util.isEmpty(account.managmentName) && account.managmentName == 'Pershing'){
                rowActions.push({label:"Maintenance", value:"maintenance"});  
                rowActions.push({label:"eBlotter", value:"eBlotter"});  
            }
            /*if(account.dataSource == 'EPS' && (!$A.util.isEmpty(profileInfo) && !profileInfo.hasFieldRepProfile) ){
                
                if(!$A.util.isEmpty(account.interactionURL))
                    rowActions.push({label:"Record Interaction/Schedule Future Activity", value:"recorInteraction"}); 
                
                rowActions.push({label:"Create Opportunity", value:"createOpportunity"});                  	
                rowActions.push({label:"In-Plan Action", value:"inPlanAdvice"});
                
            }*/
        /*    if(account.dataSourceOrig == 'PDAB' && (!$A.util.isEmpty(profileInfo) && profileInfo.hasVproRepProfile) ){
                rowActions.push({label:"VPro Participant Summary", value:"vProParticipantSummary"});
            }
            allAccountInfo[index].rowActions = rowActions;
        }
        return allAccountInfo;
    },
    initFinAccDataGrid : function(cmp, event, helper) {	
        var divId = cmp.find("finAccGrid");
        var allAccountInfo = cmp.get("v.allAccountInfo");
        console.log(' initFinAccDataGrid allAccountInfo '+ allAccountInfo);
        var headerList = helper.initColumnConfig(cmp, event, helper, allAccountInfo);        
        $A.createComponent("c:DynamicDataTable", {
            "headerList":headerList,
            "dataList": allAccountInfo,
            "hasRowActions" : false,
        }, function (contentComponent, status, error) { 
            helper.toggleSpinner(cmp, event, 'slds-hide');
            if (status === "SUCCESS") {
                divId.set('v.body', contentComponent);
                console.log('data grid created');
            } else {
                console.log('data grid error');
                throw new Error(error);
            }
        });
    },
    //hold Investment Account  table columns headers labels
    initColumnConfig: function(cmp, event, helper, allAccountInfo) {
        var fAccountType = cmp.get("v.fAccountType");
        var headerList;
        if(fAccountType === "Investment Accounts") {
            headerList = [
                {label:"ACCOUNT NUMBER", name:"accountNumber", type:"link"},
                {label:"CLIENT NAME", name:"name", type:"link"},
                {label:"ACCOUNT TYPE", name:"accountType", type:""},
                {label:"PRODUCER SPONSOR", name:"sponsor", type:""},
                {label:"MODEL", name:"model", type:""},
                {label:"CASH", name:"cash", type:"currency", "showTotal": true},
                //{label:"CASH", name:"cash", type:"currency"},
                {label:"BALANCE", name:"balance", type:"currency", "showTotal": true},
                //{label:"BALANCE", name:"balance", type:"currency"},
            ];
        }
        else if(fAccountType === "Employer Plans") {
            headerList = [
                {label:"PLAN ID", name:"planId", type:"text"},
                {label:"PLAN NAME", name:"planName", type:"text"},
                {label:"CLIENT", name:"name", type:"link"},
                {label:"BALANCE", name:"balance", type:"currency", "showTotal": (cmp.get("v.sObjectName") == "households_Household__c") ? true : false}
            ];    
        }
        else if(fAccountType === "Insurance Policies") {
            headerList = [
                {label:"TYPE", name:"planId", type:"text"},
                {label:"OWNER", name:"planName", type:"text"},
                {label:"INSURED", name:"name", type:"text"},
                {label:"CASH VALUE", name:"balance", type:"currency", "showTotal": true},
                {label:"DEATH BENEFITS", name:"balance", type:"currency", "showTotal": true},
                {label:"SOURCE", name:"balance", type:"text"}
            ];    
        }
        else {
            
        }
            
        //var totalRoa  = helper.calculateTotalROA(allAccountInfo) + "%";
        //headerList.push( {label:"ROA", name:"roa", type:"calc", "showTotal": true, total:totalRoa});
        return headerList;
    },
            
    //open client detail when user clicks on a name inside the data table
    handleDataCellClickEvent : function(cmp, event, helper) {
        var row = event.getParam("row");
        var column = event.getParam("column");  
        var fAccountType = cmp.get("v.fAccountType");
        if(fAccountType === "Investment Accounts") {
            if(column == 'name'){
                if(!$A.util.isEmpty(row.clientId))
                    window.open('/'+row.clientId,'_blank');
            }
            if(column == 'accountNumber'){
                if(!$A.util.isEmpty(row.faId))
                    window.open('/'+row.faId,'_blank');
            }   
        }
        else if(fAccountType === "Employer Plans") {
            if(column == 'name'){
                if(!$A.util.isEmpty(row.clientId))
                    window.open('/'+row.clientId,'_blank');
            }
        }
        else if(fAccountType === "Insurance Policies") {
        }
        else {
            
        }
    },
    // allow user to select an action to be performed from the action column inside the data table
    handleRowActionEvent : function(cmp, event, helper) {	
        var row = event.getParam("row");
        console.log('row ### '+JSON.stringify(row));
        var actionName =  event.getParam("actionName");
        var profileInfo = cmp.get("v.profileInfo");
       
        if(actionName == 'maintenance'){
            if(!$A.util.isEmpty(row) && !$A.util.isEmpty(row.faId)){       
                var url = '/apex/MaintenanceWizard?acctNumberId=' + row.faId;
            	window.open(url,'_blank');
            }
        }
        else if(actionName == 'inPlanAdvice'){
             var inPlanElgible = !$A.util.isEmpty(profileInfo) && (profileInfo.hasBrokerDealerRRProfile 
             					 || profileInfo.hasSystemAdminProfile || profileInfo.hasServiceIDProfile);
        	if(!$A.util.isEmpty(row)){
            	var pageUrl = '/apex/RRCaptureInPlanActionPage?isRetainInPlanEligible='+ inPlanElgible +'&lastName='+ row.clientLastName + '&personAcctID='+  row.clientId + '&atRisk=' + row.balance + '&planId=' + row.planId +'&clientSSN='+ row.clientSSN+'&fromDetailPage=true';
               // window.open(pageUrl);
                helper.openPopupWindow(pageUrl, 'Capture In-Plan Action', 650, 300);
            }
        }
        else if(actionName == 'recorInteraction' && !$A.util.isEmpty(row) && !$A.util.isEmpty(row.interactionURL)){
            window.open(row.interactionURL);
        }
        else if(actionName == 'createOpportunity' && !$A.util.isEmpty(row)){
        	var pageUrl = '/apex/RRCreateNewOpportunity?from=EPS&lastName='+ row.clientLastName +'&profileName=' + profileInfo.profileName + '&personAcctID='+  row.clientId + '&atRisk=' + row.balance + '&planId=' + row.planId +'&agentTIN='+ row.repCode+'&accountNum=' + row.accountNumber;
        	helper.openPopupWindow(pageUrl, 'Create New Opportunity', 580, 320);
        }
		 // Added for case:22759
		else if(actionName == 'vProParticipantSummary' && !$A.util.isEmpty(row) && (!$A.util.isEmpty(profileInfo) && profileInfo.hasVproRepProfile)){
            var planNumber = (row.planId == undefined) ? "" : row.planId;
            var url = '/apex/VproSSOService?planNumber=' + planNumber + '&planName=' + row.planName + '&participantName=' +row.participantName + '&participantId=' + row.participantId;
            window.open(url,'_blank');
        } 
        
         // Added for case:24466
         // //added for case # 24374
       else if(actionName == 'eBlotter') {
            if(!$A.util.isEmpty(row) && !$A.util.isEmpty(row.faId)){       
                var url = '/apex/EBlotterNewEntryPage?accno=' + row.accountNumber;
            	window.open(url);
            }    
       }      
    },
    //Special Logic to calculate total ROA, not the best way but only workable solution for now
    calculateTotalROA : function(allAccountInfo) {
        var totalGDC = 0, totalBal = 0, totalRoa = 0;
        for(var dataIndx = 0; dataIndx  < allAccountInfo.length; dataIndx++){
            var gdcVal = 0, balVal = 0; 
            var account =  allAccountInfo[dataIndx];
            if(account.gdc &&  account.gdc.toString().includes("$")) {
                gdcVal = parseFloat(account.gdc.replace(/[^0-9.-]+/g,''));
            }
            else {
                gdcVal =  $A.util.isEmpty(account.gdc) ? 0 : parseFloat(account.gdc);
            }
            
            if(account.balance &&  account.balance.toString().includes("$")) {
                balVal = parseFloat(account.balance.replace(/[^0-9.-]+/g,''));
            }
            else {
                balVal =  $A.util.isEmpty(account.balance) ? 0 : parseFloat(account.balance);
            }
            
            totalGDC += gdcVal;
            totalBal += balVal;
        }
        if(totalGDC > 0 && totalBal > 0 )
            totalRoa = totalGDC/totalBal;
        
        return Math.round(totalRoa * 100) / 100;
},

*/
    toggleSpinner: function (cmp, event, helper,toggleType){
        cmp.set('v.containerSpinner', toggleType);
    },
    showMessage : function(component, event, type, errMsg) {
        this.toggleSpinner(component, event, 'slds-hide');
        var self = this;
        component.find('msgDiv').showNotice({
            "variant": type,
            "header": (type == 'error' ? 'Error' : 'Success'),
            "message": errMsg,
            closeCallback: function(){
                if(type != 'error'){
                    self.closeAction(); 
                }
            }
        });
    }, 
})