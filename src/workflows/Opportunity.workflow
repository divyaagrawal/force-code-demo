<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>AssOppEmailToOwner</fullName>
        <description>AssOppEmailToOwner</description>
        <protected>false</protected>
        <recipients>
            <type>accountOwner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/m_ass2_student_email_template</template>
    </alerts>
    <fieldUpdates>
        <fullName>set_stage_to_closed_won</fullName>
        <field>StageName</field>
        <literalValue>Closed Won</literalValue>
        <name>set stage to closed won</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>AssEmailSendonOppStatusEditted</fullName>
        <actions>
            <name>AssOppEmailToOwner</name>
            <type>Alert</type>
        </actions>
        <active>false</active>
        <formula>ISCHANGED( StageName )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>if status changed</fullName>
        <actions>
            <name>set_stage_to_closed_won</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Opportunity.DeliveryInstallationStatus__c</field>
            <operation>equals</operation>
            <value>In progress</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
</Workflow>
