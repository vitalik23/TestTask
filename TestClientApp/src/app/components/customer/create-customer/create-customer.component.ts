import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { CreateCustomerModel } from 'src/app/models/customers/create.model';
import { CreateCustomer } from '../store/actions/customer.actions';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  createModel: CreateCustomerModel;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<CreateCustomerComponent>
  ) {
    this.createModel = new CreateCustomerModel();
   }

  ngOnInit(): void {
  }

  public create(){
    this.store.dispatch(new CreateCustomer(this.createModel));
    this.close();
  }

  public close(){
    this.dialogRef.close();
  }

}
