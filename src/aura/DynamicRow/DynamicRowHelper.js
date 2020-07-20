({
    
    
    createObjectData: function(component, event) {
        // get the contactList from component and add(push) New Object to List  
        var RowItemList = component.get("v.objectRows");
        var columnList=  component.get("v.listOfAllFields");
        var listOfapiName = [];
                            
                            for (var i = 0; i < columnList.length; i++){
                               // listOfapiName.push(columnList[i]+":"+'');
                                listOfapiName.push(columnList[i]+'');
                            }
        
        RowItemList.push({
           listOfapiName
        });
            // alert(RowItemList);
            component.set("v.objectRows", RowItemList);
            
        },
            // helper function for check if first Name is not null/blank on save
            validateRequired: function(component, event) {
                var isValid = true;
                var allContactRows = component.get("v.contactList");
                for (var indexVar = 0; indexVar < allContactRows.length; indexVar++) {
                    //if (allContactRows[indexVar].FirstName == '') {
                    // isValid = false;
                    // alert('First Name Can\'t be Blank on Row Number ' + (indexVar + 1));
                    //}
                }
                return isValid;
            },
            toremoveRow: function(component, event, helper) {
                
                var index = event.getParam("indexVar");  
                var AllRowsList = component.get("v.objectRows");
                AllRowsList.splice(index, 1); 
                component.set("v.objectRows", AllRowsList);
            },
            validateAccountList: function(component, event) {
                //Validate all account records
                var isValid = true;
                var accountList = component.get("v.listOfAllFields");
                for (var i = 0; i < accountList.length; i++) {
                    if (accountList[i].Name == '') {
                        isValid = false;
                        alert('Account Name cannot be blank on row number ' + (i + 1));
                    }
                }
                return isValid;
            },
           
            onInit: function(component, event, helper) {
                var ObjectName = component.get("v.ObjectName");
                var FieldSetName = component.get("v.FieldSetName");
               
                var RowItemList = component.get("v.objectRows");
                var action = component.get("c.listAllFields");
                
                if ((ObjectName != null && ObjectName != "" && ObjectName != undefined)&&
                    (FieldSetName != null && FieldSetName != "" && FieldSetName != undefined)) {
                    action.setParams({
                        objectName: ObjectName,
                        FieldSetName:FieldSetName
                    });
                    
                    
                    action.setCallback(this, function(response) {
                        
                       var state = response.getState();
                        
                        if (state === "SUCCESS" && component.isValid()) {
                           // component.find("sfdcDiv").set("v.body", []);
                            var responseValue = response.getReturnValue();
                            var objectValue = responseValue.sObjectData;
                            var fieldList = responseValue.fieldList;
                            var listOfapiName = [];
                           
                            
                            for (var i = 0; i < fieldList.length; i++){
                               // listOfapiName.push((fieldList[i].apiName)+":"+'');
                                listOfapiName.push((fieldList[i].apiName)+'');
                            }
                            //alert(listOfapiName);
                            
                            var RowItemList = component.get("v.objectRows");
                          RowItemList.push(
                                listOfapiName
                           );
                             
                                component.set("v.listOfAllFields", fieldList);
                            component.set("v.ListOfCell",listOfapiName);
                                component.set("v.objectRows", RowItemList);
                               // alert(RowItemList);
                                /* Create Dynamic Table */
                                var sObjectDataTableHeader = [];
                                // Create table Header
                                for (var i = 0; i < fieldList.length; i++) {
                                sObjectDataTableHeader.push(fieldList[i].label+" ");
                            }
                                console.log(sObjectDataTableHeader);
                                //Get the count of columns.
                                var columnCount = sObjectDataTableHeader.length;
                                
                            } else {
                                var errors = response.getError();
                                $A.log("Error Details " + errors);
                                if (errors || errors[0].message) {
                                console.log("Error Details " + errors[0].message);
                            }
                            }
                            });
                                $A.enqueueAction(action);
                            } else {
                                component.set("v.isSending", false);
                            }
                            }
                            });