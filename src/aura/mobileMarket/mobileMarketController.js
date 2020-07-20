({
	myAction : function(component, event, helper) {
		
	},
    
    imgSwap : function(component, event, helper) {
		var nSid = event.target.id;
		component.set("v.nSid",nSid);  
	},
    
    getQuote : function(component, event, helper) {
     var sSmartWorkBaseUrl = "https://advisors.accp.voyasmartworks.com";
            var sURL = sSmartWorkBaseUrl+ "/Workstation/SecurityDetails.aspx?symb=";
            var symbolTextId = document.getElementById('txtSymbol');
            if( symbolTextId.value == "" || symbolTextId.value == null )
                sURL += "?x=12&y=5";
            else
                sURL += symbolTextId.value;
                
            window.open(sURL,'Quotes','height=750,width=800,resizable=yes');
            return false;
      },
    
    formPress: function(component, event, helper) {
		if (event.keyCode === 13) {
			alert('Enter preessed');
		}
	},
    
 

  
})