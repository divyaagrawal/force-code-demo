declare module "@salesforce/apex/DynamicRowController.saveContacts" {
  export default function saveContacts(param: {ListContact: any}): Promise<any>;
}
declare module "@salesforce/apex/DynamicRowController.listAllObject" {
  export default function listAllObject(): Promise<any>;
}
declare module "@salesforce/apex/DynamicRowController.saveData" {
  export default function saveData(param: {ListData: any}): Promise<any>;
}
declare module "@salesforce/apex/DynamicRowController.listAllFields" {
  export default function listAllFields(param: {objectName: any, FieldSet: any}): Promise<any>;
}
declare module "@salesforce/apex/DynamicRowController.listOfAllFields" {
  export default function listOfAllFields(param: {dynamicData: any}): Promise<any>;
}
