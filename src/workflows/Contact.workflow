<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Birthday_alert</fullName>
        <description>Birthday alert befor two days</description>
        <protected>false</protected>
        <recipients>
            <field>Email</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/birthday_Email</template>
    </alerts>
    <alerts>
        <fullName>teacher_updated</fullName>
        <ccEmails>rashigarg7@gmail.com</ccEmails>
        <description>teacher updated</description>
        <protected>false</protected>
        <recipients>
            <recipient>techdivadivya@gmail.com</recipient>
            <type>user</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/Student_record_change</template>
    </alerts>
    <rules>
        <fullName>email send to contact on bithday</fullName>
        <active>false</active>
        <formula>Birthdate - 2 = TODAY()</formula>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
        <workflowTimeTriggers>
            <offsetFromField>Contact.Birthdate</offsetFromField>
            <timeLength>-1</timeLength>
            <workflowTimeTriggerUnit>Hours</workflowTimeTriggerUnit>
        </workflowTimeTriggers>
    </rules>
    <rules>
        <fullName>teacher updated</fullName>
        <actions>
            <name>teacher_updated</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Contact.Experience__c</field>
            <operation>greaterOrEqual</operation>
            <value>5</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
</Workflow>
