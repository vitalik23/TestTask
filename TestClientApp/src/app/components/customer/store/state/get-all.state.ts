import { Injectable, Injector, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetCustomerModel } from "src/app/models/customers/get.model";
import { CustomerService } from "src/app/services/customer.service";
import { GetAllCustomerWithoutFilters, GetCustomer } from "../actions/customer.actions";

export class GetAllCustomersStateModel {
    customers: Array<GetCustomerModel>;
}

@State<GetAllCustomersStateModel>({
    name: 'getAllCustomers',
    defaults: {
        customers: []
    }
})

@Injectable()
export class GetAllCustomersState {
    constructor(
        private customerService: CustomerService,
    ) {}

    @Selector()
    static getAllCustomers(state: GetAllCustomersStateModel) {
        return state.customers;
    }

    @Action(GetAllCustomerWithoutFilters)
    get({ getState, setState }: StateContext<GetAllCustomersStateModel>) {
        return this.customerService.getAllWithoutFilters().pipe(
            tap((result) => {   
                const state = getState();
                setState({
                    ...state,
                    customers: result
                });
            }
        ));
    }
}