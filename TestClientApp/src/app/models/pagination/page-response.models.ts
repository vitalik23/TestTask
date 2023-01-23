export class PagedResponse<T>{
    data: Array<T>;
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}