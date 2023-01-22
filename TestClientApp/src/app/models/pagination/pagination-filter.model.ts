export class PaginationFilterModel{
    pageNumber: number;
    pageSize: number;

    constructor(){
        this.pageNumber = 1;
        this.pageSize = 5;
    }
}