declare module "@salesforce/apex/TabController.initTabData" {
  export default function initTabData(param: {recordId: any}): Promise<any>;
}
declare module "@salesforce/apex/TabController.initSteps" {
  export default function initSteps(param: {tabDataStr: any, step: any}): Promise<any>;
}
