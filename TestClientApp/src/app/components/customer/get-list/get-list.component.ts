import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FilterCustomerModel } from 'src/app/models/customers/filter.model';
import { FilteredAndPagedCustomerModel } from 'src/app/models/customers/filtered-and-paged.model';
import { GetCustomerModel } from 'src/app/models/customers/get.model';
import { PaginationFilterModel } from 'src/app/models/pagination/pagination-filter.model';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { DeleteCustomer, GetAllCustomers, GetCustomer } from '../store/actions/customer.actions';
import { CustomersState } from '../store/state/customers.state';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';

@Component({
  selector: 'app-get-list',
  templateUrl: './get-list.component.html',
  styleUrls: ['./get-list.component.scss']
})
export class GetListComponent implements OnInit {

  @Select(CustomersState.getData) customers$: Observable<GetCustomerModel[]>;
  @Select(CustomersState.getPageNumber) pageNumber$: Observable<number>;
  @Select(CustomersState.getPageSize) pageSize$: Observable<number>;
  @Select(CustomersState.getTotalItems) totalItems$: Observable<number>;

  customers: Array<GetCustomerModel>;
  pageNumber: number;
  pageSize: number;
  totalItems: number;

  displayedColumns: string[] = ['name', 'email', 'phone', 'companyName', 'actions'];

  filter: FilterCustomerModel;

  getAllModel: FilteredAndPagedCustomerModel;

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {
    this.getAllModel = new FilteredAndPagedCustomerModel();
    this.filter = new FilterCustomerModel();
  }

  ngOnInit(): void {

    this.store.dispatch(new GetAllCustomers(this.getAllModel));

    this.customers$.pipe().subscribe((data) => { this.customers = data; });

    this.pageNumber$.pipe().subscribe((data) => { this.pageNumber = data });

    this.pageSize$.pipe().subscribe((data) => { this.pageSize = data });

    this.totalItems$.pipe().subscribe((data) => { this.totalItems = data });
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

  public filtration(event: any, fieldName: string){
    console.log(event.value);

    var val = event.value;

    if(fieldName == "name"){
      this.getAllModel.filters.name = val;
    }

    this.store.dispatch(new GetAllCustomers(this.getAllModel));
  }

  public getPaginatorData(event: any){
    console.log(event);

    this.getAllModel.pagination.pageNumber = event.pageIndex + 1;
    this.getAllModel.pagination.pageSize = event.pageSize;

    this.store.dispatch(new GetAllCustomers(this.getAllModel));
  }

}
