import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { GetListComponent } from './get-list/get-list.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { CustomersState } from './store/state/customers.state';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GetCustomerState } from './store/state/get-customer.state';
import { GetAllCustomersState } from './store/state/get-all.state';
import { SortableHeaderDirective } from 'src/app/directives/sortable-header.directive';


@NgModule({
  declarations: [
    GetListComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent,
    SortableHeaderDirective
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([CustomersState, GetCustomerState, GetAllCustomersState]),
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  exports: [
    SortableHeaderDirective
  ]
})
export class CustomerModule { }
