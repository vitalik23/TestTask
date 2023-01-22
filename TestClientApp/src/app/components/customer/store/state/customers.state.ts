import { Injectable, Injector, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetCustomerModel } from "src/app/models/customers/get.model";
import { CustomerService } from "src/app/services/customer.service";
import { CreateCustomer, DeleteCustomer, GetAllCustomers, GetCustomer, UpdateCustomer } from "../actions/customer.actions";

export class CustomersStateModel {
    data: Array<GetCustomerModel>;
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}

@State<CustomersStateModel>({
    name: 'customers',
    defaults: {
        data: [],
        pageNumber: 1,
        pageSize: 10,
        totalItems: 0
    }
})

@Injectable()
export class CustomersState {
    constructor(
        private customerService: CustomerService,
        private router: Router,
        private injector: Injector
    ) {

    }

    @Selector()
    static getData(state: CustomersStateModel) {
        return state.data;
    }

    @Action(CreateCustomer)
    create({ getState, patchState }: StateContext<CustomersStateModel>, { payload }: CreateCustomer) {
        return this.customerService.create(payload).pipe(
            tap((result) => {   
                console.log(result);
                const state = getState();
                patchState({
                    data: [...state.data, result]
                });
            }
            
        ));
    }

    @Action(UpdateCustomer)
    update({ getState, setState }: StateContext<CustomersStateModel>, { payload }: UpdateCustomer) {
        return this.customerService.update(payload).pipe(
            tap((result) => {   
                console.log(result);
                const state = getState();
                const customerList = [...state.data];
                const customerIndex = customerList.findIndex(
                    (item) => item.id == payload.id
                );
                customerList[customerIndex] = result;

                setState({
                    ...state,
                    data: customerList
                });

                const ngZone = this.injector.get(NgZone);
                ngZone.run(() => {
                    this.router.navigateByUrl('/customer/get-list');
                });
            }
        ));
    }

    @Action(DeleteCustomer)
    delete({ getState, setState }: StateContext<CustomersStateModel>, { payload }: DeleteCustomer) {
        return this.customerService.delete(payload).pipe(
            tap(_ => {   
                const state = getState();

                const categoryList = state.data.filter(
                    (item) => item.id != payload
                );
                setState({ ...state, data: categoryList });
            }
        ));
    }

    @Action(GetCustomer)
    get({ getState, setState }: StateContext<CustomersStateModel>, { payload }: GetCustomer) {
        return this.customerService.get(payload).pipe(
            tap((result) => {   
                console.log(result);

            }
        ));
    }

    @Action(GetAllCustomers)
    getAll({ getState, setState }: StateContext<CustomersStateModel>, { payload }: GetAllCustomers) {
        return this.customerService.getAll(payload).pipe(
            tap((result) => {   
                console.log(result);
                const state = getState();
                var customers = state.data;

                if(!customers){
                    customers = [];
                }

                setState({
                    ...state,
                    data: result.data,
                    pageNumber: result.pageNumber,
                    pageSize: result.pageSize,
                    totalItems: result.totalItems
                });
            }
        ));
    }
}