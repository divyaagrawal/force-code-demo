({
	
	everyMinute : function(component,helper){ 
 		alert('Hello');
        
        //Show Toast code Here
        
        window.setTimeout( $A.getCallback(function() 
                                          { 
                                              console.log('Calling'); 
                                              helper.everyMinute(component,helper);
                                          }), 6000 ); 
	}
})