import { Injectable, Injector, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetCustomerModel } from "src/app/models/customers/get.model";
import { CustomerService } from "src/app/services/customer.service";
import { GetCustomer } from "../actions/customer.actions";

export class GetCustomerStateModel {
    customer: GetCustomerModel;
}

@State<GetCustomerStateModel>({
    name: 'getCustomer',
    defaults: {
        customer: new GetCustomerModel()
    }
})

@Injectable()
export class GetCustomerState {
    constructor(
        private customerService: CustomerService,
    ) {}

    @Selector()
    static getCustomer(state: GetCustomerStateModel) {
        return state.customer;
    }

    @Action(GetCustomer)
    get({ getState, setState }: StateContext<GetCustomerStateModel>, { payload }: GetCustomer) {
        return this.customerService.get(payload).pipe(
            tap((result) => {   
                const state = getState();
                setState({
                    ...state,
                    customer: result
                });
            }
        ));
    }
}