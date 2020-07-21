declare module "@salesforce/apex/InfiniteScroll.getBooksByAllCategories" {
  export default function getBooksByAllCategories(): Promise<any>;
}
declare module "@salesforce/apex/InfiniteScroll.getBooksCategories" {
  export default function getBooksCategories(): Promise<any>;
}
declare module "@salesforce/apex/InfiniteScroll.getBooks" {
  export default function getBooks(param: {limits: any, offsets: any}): Promise<any>;
}
declare module "@salesforce/apex/InfiniteScroll.getTotalCount" {
  export default function getTotalCount(): Promise<any>;
}
declare module "@salesforce/apex/InfiniteScroll.deleteBooks" {
  export default function deleteBooks(param: {ids: any}): Promise<any>;
}
