({
    addAccountRecord: function(component, event) {
        //get the account List from component  
        var accountList = component.get("v.accountList");
        //Add New Account Record
        accountList.push({
            'sobjectType': 'Account',
            'Name': '',
            'AccountNumber': '',
            'Phone': ''
        });
        component.set("v.accountList", accountList);
    },
     
    validateAccountList: function(component, event) {
        //Validate all account records
        var isValid = true;
        var accountList = component.get("v.accountList");
        for (var i = 0; i < accountList.length; i++) {
            if (accountList[i].Name == '') {
                isValid = false;
                alert('Account Name cannot be blank on row number ' + (i + 1));
            }
        }
        return isValid;
    },
     
    saveAccountList: function(component, event, helper) {
        //Call Apex class and pass account list parameters
        var action = component.get("c.saveAccounts");
        action.setParams({
            "accList": component.get("v.accountList")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.accountList", []);
                alert('Account records saved successfully');
                this.addAccountRecord(component, event);
            }
        }); 
        $A.enqueueAction(action);
    },
    
    getFieldSetFields: function(component, event, helper) {
        //Call Apex class and pass account list parameters
        var action = component.get("c.getFieldSetMember");
        action.setParams({
            "objectName": 'Account',
            "fieldSetName": 'Account_Field_Set'
        });
        action.setCallback(this, function(response) {
            debugger;
            var state = response.getState();
            if (state === "SUCCESS") {
                var fieldList = response.getReturnValue();
                component.set("v.fieldList",fieldList);
                 this.addAccountRecord(component, event);
            }
        }); 
        $A.enqueueAction(action);
    },
})