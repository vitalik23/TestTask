import { CreateCustomerModel } from "src/app/models/customers/create.model";
import { FilteredAndPagedCustomerModel } from "src/app/models/customers/filtered-and-paged.model";
import { UpdateCustomerModel } from "src/app/models/customers/update.model";

export class CreateCustomer{
    static readonly type = '[Customer] Create';
    constructor(public payload: CreateCustomerModel){}
}

export class UpdateCustomer{
    static readonly type = '[Customer] Update';
    constructor(public payload: UpdateCustomerModel){}
}

export class DeleteCustomer{
    static readonly type = '[Customer] Delete';
    constructor(public payload: string){}
}

export class GetCustomer{
    static readonly type = '[Customer] Get';
    constructor(public payload: string){}
}

export class GetAllCustomer{
    static readonly type = '[Customer] GetAll';
    constructor(public payload: FilteredAndPagedCustomerModel){}
}
