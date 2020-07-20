trigger DeveMode on User (after update) {
for(User a:[Select id ,UserPreferencesApexPagesDeveloperMode from USER where 
Profile.Name='System Administrator' AND id in:Trigger.old] )
{

//a.UserPreferencesApexPagesDeveloperMode =true;
if(a.UserPreferencesApexPagesDeveloperMode ==false){
a.UserPreferencesApexPagesDeveloperMode =true;
update a;
}
}

}