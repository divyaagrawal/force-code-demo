({
    toggleSpinner : function(component, action) {
        component.set('v.loading',action == 'show');
    },
    
    MSLAccessInteractionVisibility : function(component){
        return new Promise(function(resolve, reject ){
            var action = component.get("c.checkInteractionCreatedByProfile");
            action.setParams({
                recordId : component.get("v.recordId")
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS"){
                    component.set('v.MSLAccessInteractionVisibility',response.getReturnValue());                    
                    resolve();
                }
                else if (state === "ERROR")
                    reject(response.getError());
            });
            $A.enqueueAction(action);
        });
  
    }, 
    
    validateSubjectSelection : function(component){
        var thirdTabData = component.get('v.WhatSubjectsData');
        if(!thirdTabData.selectedSubjects || thirdTabData.selectedSubjects.length == 0 ){
            component.set('v.currentStage','tab3');
            component.set('v.showError',true);
            component.set('v.showSuccess',false);
            component.set('v.errorMsg','Please select atleast one subject to proceed further');
            return false;
        }else{
            component.set('v.showError',false);
        }
        return true;
    },
    
    setupData : function(component, tabIdentifier){
        debugger;
        if(!$A.util.isEmpty(tabIdentifier)){
            if(tabIdentifier == 'fourthTab'){
                var additionalAttendee = component.get('v.whoIsAttendingData.additionalAttendee');
                if(typeof additionalAttendee!= 'undefined' && !$A.util.isEmpty(additionalAttendee) && parseInt(additionalAttendee)> 0)
                  component.set('v.disableUnknownAttendee',false);
                else
                  component.set('v.disableUnknownAttendee',true); 
            }
            var subjects = component.get('v.WhatSubjectsData.selectedSubjects');
            var tabData = component.get('v.logList');
            var fourthTabData=[];
            var newTabData = [];
            
            for(var i=0;i<tabData.length;i++){
                fourthTabData.push(tabData[i].subjectName);
            }
            
            for(var i=0;i<tabData.length;i++){
                if(subjects.indexOf(tabData[i].subjectName) !== -1)
                    newTabData.push(tabData[i]);
            }
            
            
            if(subjects.length > 0 ){
                for(var i=0;i<subjects.length;i++){
                    if((fourthTabData.length>0 && !fourthTabData.includes(subjects[i]))|| fourthTabData.length === 0){
                        var lstHCP = [{
                            'HCPs' : [],
                            'feedback' : ''
                        }];
                        
                        var lstLbCon = [{
                            'ContactId' : '',
                            'ContactName' : '',
                            'count' : '0'
                        }];
                        
                        var lstlb = [{
                            'resourceId' : '',
                            'resourceName' : '',
                            'unknownAttendeeCount' : '0',
                            'isSelected' : false,
                            'contactData' : lstLbCon                            
                        }];
                        
                        var lstKeyTopics = [{
                            'keyTopicValue' : '--None--',
                            'ProactiveOrReactive' : 'Reactive',
                            'materialValue' : [],
                            'HCPList' : lstHCP,
                            'LeaveBehindList' : lstlb
                        }];
                        
                        var logInteractionObj = {
                            'subjectName' : subjects[i],
                            'keyTopicsList' : lstKeyTopics
                        };
                        newTabData.push(logInteractionObj);  
                    }
                }
                component.set('v.logList',newTabData);
            }
        }
    },
    
    validateData : function(component,currentTab,identifier){
        debugger;
        if(currentTab == 'tab1'){
            var firstTabData = component.get('v.whoIsAttendingData');
            if(firstTabData == null || firstTabData.selectedContacts.length < 1){
                component.set('v.currentStage','tab1');
                component.set('v.showError',true);
                component.set('v.errorMsg','Please select atleast one Attendee');
                return false;
                
            }
            return true;
        }else if(currentTab == 'tab2'){
            debugger;
            var today = new Date();
            var currentDateInFormat = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            
            var secondTabData = component.get('v.howAndWhenData');
            if((secondTabData.selectedType === '' || secondTabData.selectedType === null || typeof secondTabData.selectedType == 'undefined') && identifier == 'Submit'){
                component.set('v.currentStage','tab2');
                component.set('v.showError',true);
                component.set('v.showSuccess',false);
                component.set('v.errorMsg','Please Select Interaction type');
                return false;
            }
            if((secondTabData.selectedDate === '' || secondTabData.selectedDate === null ||  secondTabData.startTime === '' || 
                secondTabData.startTime === null || secondTabData.endTime === '' || secondTabData.endTime === null) && identifier == 'Submit'){
                component.set('v.currentStage','tab2');
                component.set('v.showError',true);
                component.set('v.showSuccess',false);
                component.set('v.errorMsg','Please fill all the data before proceed to another tab');
                return false;
                
            }
            else if(secondTabData.selectedType == 'Non Office' && secondTabData.RadioType === ''){
                component.set('v.currentStage','tab2');
                component.set('v.showError',true);
                component.set('v.showSuccess',false);
                component.set('v.errorMsg','Select a Non Office value');
                return false;
            }
            else if(secondTabData.selectedDate !== null && Date.parse(secondTabData.selectedDate) > Date.parse(today) && !$A.util.isEmpty(identifier) && identifier == 'Submit'){
                component.set('v.currentStage','tab2');
                component.set('v.showError',true);
                component.set('v.showSuccess',false);
                component.set('v.errorMsg','Date/Time should not be in future');
                return false;
            }
            /*    else if(!this.validateDuration(secondTabData.startTime,secondTabData.endTime)){
                        component.set('v.currentStage','tab2');
                        component.set('v.showError',true);
                        component.set('v.showSuccess',false);
                        component.set('v.errorMsg','Duration should not be more than 4 hours');
                        return false;   
                    }*/
            else if($A.util.isEmpty(secondTabData.selectedDate) && identifier == 'Save'){
                component.set('v.currentStage','tab2');
                component.set('v.showError',true);
                component.set('v.showSuccess',false);
                component.set('v.errorMsg','Please select a Date/Time to save Interaction');
                return false;
            }
            else{
                component.set('v.showError',false);  
                return true;
            }            
        }
            else if(currentTab == 'tab3'){
                var thirdTabData = component.get('v.WhatSubjectsData');
                if(thirdTabData.selectedSubjects.length === 0){
                    component.set('v.currentStage','tab3');
                    component.set('v.showError',true);
                    component.set('v.showSuccess',false);
                    component.set('v.errorMsg','Please select atleast one subject');
                    return false;
                }else{
                    component.set('v.showError',false);
                    return true;
                }
            }
                else if(currentTab == 'tab4'){
                    var fourthTabData = component.get('v.logList');
                    for(var i=0;i<fourthTabData.length;i++){
                        if(fourthTabData[i].keyTopicsList.length == 0 && identifier === 'Submit'){
                            component.set('v.currentStage','tab4');
                            component.set('v.showError',true);
                            component.set('v.showSuccess',false);
                            component.set('v.errorMsg','Please add atleast one Key Topic');
                            return false;
                        }
                        for(var j=0;j<fourthTabData[i].keyTopicsList.length;j++){
                            if($A.util.isEmpty(fourthTabData[i].keyTopicsList[j].keyTopicValue) || (fourthTabData[i].keyTopicsList[j].keyTopicValue == '--None--' && identifier === 'Submit')){
                                component.set('v.currentStage','tab4');
                                component.set('v.showError',true);
                                component.set('v.showSuccess',false);
                                component.set('v.errorMsg','Please select a Key Topic to the selected subject');
                                return false;
                            }
                            else if($A.util.isEmpty(fourthTabData[i].keyTopicsList[j].ProactiveOrReactive) && identifier === 'Submit'){
                                component.set('v.currentStage','tab4');
                                component.set('v.showError',true);
                                component.set('v.showSuccess',false);
                                component.set('v.errorMsg','Please select either Proactive or Reactive');
                                return false;
                            }
                            if(identifier === 'Submit'){
                               /* if(typeof fourthTabData[i].keyTopicsList[j].HCPList == 'undefined' || fourthTabData[i].keyTopicsList[j].HCPList.length == 0){
                                    component.set('v.currentStage','tab4');
                                    component.set('v.showError',true);
                                    component.set('v.showSuccess',false);
                                    component.set('v.errorMsg','Please select atleast one HCP');
                                    return false; 
                                }*/
                                for(var k=0;k<fourthTabData[i].keyTopicsList[j].HCPList.length;k++){
                                   /* if(fourthTabData[i].keyTopicsList[j].HCPList[k].HCPs.length == 0){
                                        component.set('v.currentStage','tab4');
                                        component.set('v.showError',true);
                                        component.set('v.showSuccess',false);
                                        component.set('v.errorMsg','Please select atleast one HCP');
                                        return false;
                                    }*/
                                     if(!$A.util.isEmpty(fourthTabData[i].keyTopicsList[j].HCPList[k].feedback) && fourthTabData[i].keyTopicsList[j].HCPList[k].HCPs.length == 0){
                                        component.set('v.currentStage','tab4');
                                        component.set('v.showError',true);
                                        component.set('v.showSuccess',false);
                                        component.set('v.errorMsg','Please select an associated HCP to the Feedback/Key Insight');
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                    if(identifier === 'Submit'){
                        var firstTabData = component.get('v.whoIsAttendingData');
                        if(! firstTabData.selectedContacts.length > 0){
                            component.set('v.currentStage','tab1');
                            component.set('v.showError',true);
                            component.set('v.showSuccess',false);
                            component.set('v.errorMsg','Please select atleast one contact');
                            return false;
                        }
                    }
                    
                    return true;
                }
    },
    
    validateDuration : function(startTime,endTime){
        var strtContainsAM = false;
        var endContainsAM = false;
        debugger;
        if(startTime.includes('am'))
            strtContainsAM = true;
        if(endTime.includes('am'))
            endContainsAM = true;
        
        var startHr = startTime.substring(0,startTime.indexOf(':'));
        var startMin = startTime.substring(startTime.indexOf(':')+1,startTime.length-2);
        var endHr = endTime.substring(0,endTime.indexOf(':'));
        var endMin = endTime.substring(endTime.indexOf(':')+1,endTime.length-2);
        
        var sDate,eDate;
        if(!strtContainsAM)
            sDate = new Date(2000, 0, 1,  parseInt(startHr), parseInt(startMin));
        else
            sDate = new Date(2000, 0, 1,  parseInt(startHr)+12, parseInt(startMin));            
        
        if(!endContainsAM)
            eDate = new Date(2000, 0, 1,  parseInt(endHr), parseInt(endMin));
        else
            eDate = new Date(2000, 0, 1,  parseInt(endHr)+12, parseInt(endMin));  
        
        var diff;
        if(eDate > sDate)
            diff = eDate-sDate;
        else
            diff = sDate-eDate;
        
        if((diff / 1000 / 60 / 60)>4)
            return false;
        else
            return true;       
    },
    
    saveData: function(component, identifier){
        debugger;
        component.set('v.loading',true);
        var tab1Data = component.get('v.whoIsAttendingData');
        var tab2Data = component.get('v.howAndWhenData');
        var tab3Data = component.get('v.WhatSubjectsData');
        var tab4Data = component.get('v.logList');
        var tab5ata =  component.get('v.comments');
        console.log(JSON.stringify(tab2Data));
        var mainWrapper = { 
            'whoIsAttendingScreen':tab1Data,
            'howAndWhenScreen':tab2Data,
            'whatSubjectScreen':tab3Data,
            'logInteractionScreen':tab4Data,
            'comments': tab5ata
        };
        debugger;
        var action = component.get("c.upsertInteraction");
        if(identifier== 'save')
            action.setParams({ 'wrapperStr' : JSON.stringify(mainWrapper), 'interactionId':component.get('v.interactionId'), 'isSubmit' : false, recordId : component.get('v.recordId') });
        else
            action.setParams({ 'wrapperStr' : JSON.stringify(mainWrapper), 'interactionId':component.get('v.interactionId'), 'isSubmit' : true, recordId : component.get('v.recordId')  });
        action.setCallback(this, function(response) {
            debugger;
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                if(!$A.util.isEmpty(component.get('v.interactionId')))
                    component.set('v.operation','updated');
                else
                    component.set('v.operation','saved');
                component.set('v.interactionId',result);
                component.set('v.loading',false);
                if(identifier== 'save')
                    component.set('v.showSuccess',true);
                else
                    component.set('v.IsInProgress',false);
                
            }
            else{
                component.set('v.loading',false);
                component.set('v.showError',true);
                component.set('v.errorMsg','Some Error Occured. Please contact System Administrator');
            }
        });  
        $A.enqueueAction(action);
    },
    
    // For initializing the Interaction screen data ... 
    loadInteractionData :function(component, event, helper){
        try{
            $A.get("e.c:maInteractionWizardEvent").setParams({
                'type' : 'showLoadingSpinner'
            }).fire();
            var action = component.get("c.loadInteractionData");
            action.setParams({ "recordId" : component.get("v.recordId")});
            action.setCallback(this, function(response){ 
                $A.get("e.c:maInteractionWizardEvent").setParams({
                    'type' : 'hideLoadingSpinner'
                }).fire();
                try{
                    debugger;
                    if(response.getState() === "SUCCESS"){
                        
                        var res = response.getReturnValue();
                        console.log('res '+ JSON.stringify(res));
                        if(typeof res.whoIsAttendingScreen  === "undefined"){
                            component.set("v.currentStage",'tab1');
                            component.set('v.howAndWhenData',{'selectedType':'','radioType':'','selectedDate':'','startTime' : '8:00am','endTime' : '9:00am'});
                            component.set('v.WhatSubjectsData',{'selectedSubjects' : [],'bTherapeuticSelected' : true});
                        }else{
                            if(res.isSubmited)
                                component.set('v.isSubmitted',true);
                            res.whoIsAttendingScreen.relatedContactList.sort(function(a, b){
                                if(a.LastName < b.LastName) { return -1; }
                                if(a.LastName > b.LastName) { return 1; }
                                return 0;
                        	});
                            component.set("v.whoIsAttendingData",res.whoIsAttendingScreen);
                            var selectedContactMap = new Map();
                            for(var i=0;i < res.whoIsAttendingScreen.relatedContactList.length ; i++){
                                if(res.whoIsAttendingScreen.relatedContactList[i].Resident__c)
                                	selectedContactMap.set(res.whoIsAttendingScreen.relatedContactList[i].Id,res.whoIsAttendingScreen.relatedContactList[i].Name);
                            }
                            var otherContactList = [];
                            for(var i=0;i < res.whoIsAttendingScreen.otherContactList.length ; i++){
                                res.whoIsAttendingScreen.otherContactList[i].Resident__c = true;
                                otherContactList.push(res.whoIsAttendingScreen.otherContactList[i]);
                                selectedContactMap.set(res.whoIsAttendingScreen.otherContactList[i].Id,res.whoIsAttendingScreen.otherContactList[i].Name);
                            }
                            component.set('v.selectedOtherContacts',otherContactList);
                            component.set('v.selectedOtherContacts',res.whoIsAttendingScreen.otherContactList);
                            component.set('v.comments',res.comments);
                            component.set('v.whoIsAttendingData.selectedContactMap',selectedContactMap);
                            component.set('v.WhatSubjectsData',res.whatSubjectScreen);
                            component.set('v.howAndWhenData',res.howAndWhenScreen);
                           /* var selectedSubjectList=[];
                            for(var i=0;i < res.whatSubjectScreen.selectedSubjects.length ; i++){
                                selectedSubjectList.push(res.whatSubjectScreen.selectedSubjects[i]);
                            }
                            component.set('v.WhatSubjectsData.selectedSubjects',selectedSubjectList);*/
                            console.log(JSON.stringify(component.get('v.WhatSubjectsData')));
                            
                            var tab4List = res.logInteractionScreen;
                            for(var i=0;i<res.logInteractionScreen.length;i++){
                                for(var j=0;j<res.logInteractionScreen[i].keyTopicsList.length;j++){
                                    if(typeof res.logInteractionScreen[i].keyTopicsList[j].HCPList == 'undefined'){
                                        tab4List[i].keyTopicsList[j].HCPList = [{
                                                                                  'HCPs' : [],
                        														  'feedback' : ''  
                                                                                }];
                                    } 
                                    if(typeof res.logInteractionScreen[i].keyTopicsList[j].LeaveBehindList == 'undefined'){
                                        var lstLbCon = [{
                                                            'ContactId' : '',
                                                            'ContactName' : '',
                                                            'count' : '0'
                                                        }];
                                        
                                        var lstlb = [{
                                                        'resourceId' : '',
                                                        'resourceName' : '',
                                                        'unknownAttendeeCount' : '0',
                                                        'isSelected' : false,
                                                        'contactData' : lstLbCon                            
                                                    }];
                                        tab4List[i].keyTopicsList[j].LeaveBehindList = lstlb;
                                    }  
                                }
                            }
                            component.set('v.logList',tab4List);
                            component.set("v.currentStage",'tab1');
                            /*var tab4List = res.logInteractionScreen;
                            for(var i=0;i < res.logInteractionScreen.length ; i++){
                                for(var j=0;j<res.logInteractionScreen[i].keyTopicsList.length; j++){
                                    if(res.logInteractionScreen[i].keyTopicsList[j].materialValue.length == 0)
                                        tab4List[i].keyTopicsList[j].materialValue = [];
                                }
                            }*/
                            
                           // component.set('v.howAndWhenData',{'selectedType':'','radioType':'','selectedDate':'','startTime' : '8:00am','endTime' : '9:00am'});
                           // component.set('v.WhatSubjectsData',{'selectedSubjects' : [],'bTherapeuticSelected' : true});
                        }
                    }else if (response.getState() === "ERROR"){
                        var errors = response.getError();
                        var errMsg = errors[0].message;
                    }
                }catch(e){
                    console.log(e.message); 
                }
            });
            $A.enqueueAction(action);
            
        }catch(e){
            console.log(e.message); 
        }
    },
    
    deleteRecord : function(component){
        var action = component.get("c.deleteInteraction");
            action.setParams({ "recordId" : component.get("v.recordId")});
            action.setCallback(this, function(response){
                if(response.getState() === "SUCCESS"){
                    var result = response.getReturnValue();
                    if(result){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type": "success",
                            "title": "Success!",
                            "message": "The record has been deleted successfully."
                        });
                        toastEvent.fire();
                        
                        var urlEvent = $A.get("e.force:navigateToURL");
                        urlEvent.setParams({
                          "url": "/lightning/n/Event_Calendar"
                        });
                        urlEvent.fire();
                                              
                    }else{                     
                       component.set('v.showError',true);
                       component.set('v.showSuccess',false);
                       component.set('v.errorMsg','Some Error occured. Please contact with System Administrator'); 
                    }
                }
                
                });
            $A.enqueueAction(action);
    }
})