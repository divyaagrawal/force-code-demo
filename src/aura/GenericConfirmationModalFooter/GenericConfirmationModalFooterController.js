({
     makeUnsavedChanges: function(cmp, evt, helper) {
         var unsaved = cmp.find("unsaved");
         unsaved.setUnsavedChanges(true);
     },
     clearUnsavedChanges: function(cmp, evt, helper) {
         var unsaved = cmp.find("unsaved");
         unsaved.setUnsavedChanges(false);
     },
     handleSave: function(cmp, evt, helper) {
         alert('handleSave');
         // When the custom save logic has completed the setUnsavedChanges method
         // must be called again to return control to the lightning UI
         var unsaved = cmp.find("unsaved");
         unsaved.setUnsavedChanges(false);
         
     },
     handleDiscard: function(cmp, evt, helper) {
         alert('handleDiscard');
     }
})