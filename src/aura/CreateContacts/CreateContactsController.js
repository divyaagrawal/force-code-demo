({
    init: function(component, event, helper) {
        //helper.getFieldSetFields(component, event);
        helper.addAccountRecord(component, event);
    },
    
    addRow: function(component, event, helper) {
        helper.addAccountRecord(component, event);
    },
     
    removeRow: function(component, event, helper) {
        //Get the account list
        var accountList = component.get("v.accountList");
        //Get the target object
        var selectedItem = event.currentTarget;
        //Get the selected item index
        var index = selectedItem.dataset.record;
        accountList.splice(index, 1);
        component.set("v.accountList", accountList);
    },
     
    save: function(component, event, helper) {
        if (helper.validateAccountList(component, event)) {
            helper.saveAccountList(component, event);
        }
    },
})