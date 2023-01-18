import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetCustomerModel } from "src/app/models/customers/get.model";
import { CustomerService } from "src/app/services/customer.service";
import { CreateCustomer, DeleteCustomer, GetAllCustomer, GetCustomer, UpdateCustomer } from "../actions/customer.actions";

export class CustomerStateModel {
    data: Array<GetCustomerModel>;
    pageNumber: number;
    pageSize: number;
    totalItems: number;
}

State<CustomerStateModel>({
    name: 'customer',
    defaults: {
        data: [],
        pageNumber: 1,
        pageSize: 10,
        totalItems: 0
    }
})

@Injectable()
export class AuthState {
    constructor(
        private customerService: CustomerService,
    ) {

    }

    @Action(CreateCustomer)
    create({ getState, patchState }: StateContext<CustomerStateModel>, { payload }: CreateCustomer) {
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
    update({ getState, setState }: StateContext<CustomerStateModel>, { payload }: UpdateCustomer) {
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
            }
        ));
    }

    @Action(DeleteCustomer)
    delete({ getState, setState }: StateContext<CustomerStateModel>, { payload }: DeleteCustomer) {
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
    get({ getState, setState }: StateContext<CustomerStateModel>, { payload }: GetCustomer) {
        return this.customerService.get(payload).pipe(
            tap((result) => {   
                console.log(result);

            }
        ));
    }

    @Action(GetAllCustomer)
    getAll({ getState, setState }: StateContext<CustomerStateModel>) {
        return this.customerService.getAll().pipe(
            tap((result) => {   
                console.log(result);
                const state = getState();
                var customers = state.data;
                
                setState({
                    ...state,
                    data: customers.concat(result),
                    // pageNumber: result.pageNumber,
                });
            }
        ));
    }
}