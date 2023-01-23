import { PaginationFilterModel } from "../pagination/pagination-filter.model";
import { FilterCustomerModel } from "./filter.model";

export class FilteredAndPagedCustomerModel{
    filters: FilterCustomerModel;
    pagination: PaginationFilterModel;

    constructor(){
        this.filters = new FilterCustomerModel();
        this.pagination = new PaginationFilterModel();
    }
}