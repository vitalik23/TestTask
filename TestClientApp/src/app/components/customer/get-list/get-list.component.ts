import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FilterCustomerModel } from 'src/app/models/customers/filter.model';
import { FilteredAndPagedCustomerModel } from 'src/app/models/customers/filtered-and-paged.model';
import { GetCustomerModel } from 'src/app/models/customers/get.model';
import { PaginationFilterModel } from 'src/app/models/pagination/pagination-filter.model';
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


  filter: FilterCustomerModel;

  getAllModel: FilteredAndPagedCustomerModel;

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {

    this.getAllModel = new FilteredAndPagedCustomerModel();
  }

  ngOnInit(): void {

    this.store.dispatch(new GetAllCustomer(this.getAllModel));

    this.customerListObservable.pipe().subscribe((data) => {
      console.log(data);
      this.customers = data;
    });
  }

  public create() {
    this.dialog.open(CreateCustomerComponent);
  }

  public remove(id: string) {
    this.store.dispatch(new DeleteCustomer(id));
  }

  public update(customer: GetCustomerModel) {
    this.dialog.open(UpdateCustomerComponent, {
      data: customer,
    });
  }

}
