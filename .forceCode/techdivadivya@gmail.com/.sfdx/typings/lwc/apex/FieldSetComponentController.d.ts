declare module "@salesforce/apex/FieldSetComponentController.getsObjects" {
  export default function getsObjects(): Promise<any>;
}
declare module "@salesforce/apex/FieldSetComponentController.getFieldSet" {
  export default function getFieldSet(param: {sObjectName: any}): Promise<any>;
}
declare module "@salesforce/apex/FieldSetComponentController.getFieldSetMember" {
  export default function getFieldSetMember(param: {objectName: any, fieldSetName: any}): Promise<any>;
}
declare module "@salesforce/apex/FieldSetComponentController.doUpsertObjects" {
  export default function doUpsertObjects(param: {objectData: any}): Promise<any>;
}
