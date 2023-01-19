import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetCustomerModel } from 'src/app/models/customers/get.model';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { DeleteCustomer, GetAllCustomer, GetCustomer } from '../store/actions/customer.actions';
import { CustomerState } from '../store/state/customer.state';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';

@Component({
  selector: 'app-get-list',
  templateUrl: './get-list.component.html',
  styleUrls: ['./get-list.component.scss']
})
export class GetListComponent implements OnInit {

  @Select(CustomerState.getData) customerListObservable: Observable<GetCustomerModel[]>;

  customers: Array<GetCustomerModel>;
  displayedColumns: string[] = ['name', 'email', 'phone', 'companyName', 'actions'];

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.store.dispatch(new GetAllCustomer());

    this.customerListObservable.pipe().subscribe((data) => {
      console.log(data);
      this.customers = data;       
    });
  }

  public create(){
    this.dialog.open(CreateCustomerComponent);
  }

  public remove(id: string){
    this.store.dispatch(new DeleteCustomer(id));
  }

  public update(customer: GetCustomerModel){
    this.dialog.open(UpdateCustomerComponent,{
      data: customer,
    });
  }

}
