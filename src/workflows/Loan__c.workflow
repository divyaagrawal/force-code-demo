<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <rules>
        <fullName>AssLoanStatusChanged</fullName>
        <active>false</active>
        <formula>ISCHANGED( status__c )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
</Workflow>
