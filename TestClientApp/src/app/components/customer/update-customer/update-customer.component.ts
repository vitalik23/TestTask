import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { GetCustomerModel } from 'src/app/models/customers/get.model';
import { UpdateCustomerModel } from 'src/app/models/customers/update.model';
import { UpdateCustomer } from '../store/actions/customer.actions';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {

  updateModel: UpdateCustomerModel;

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<UpdateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GetCustomerModel
  ) {
    this.updateModel = new UpdateCustomerModel();
   }

  ngOnInit(): void {
    console.log(this.data);
    if(this.data){
      this.setCustomerModel();
    }
  }

  public update(){
    this.store.dispatch(new UpdateCustomer(this.updateModel));
    this.close();
  }

  public close(){
    this.dialogRef.close();
  }

  private setCustomerModel(){
    this.updateModel.id = this.data.id;
    this.updateModel.name = this.data.name;
    this.updateModel.email = this.data.email;
    this.updateModel.phone = this.data.phone;
    this.updateModel.companyName = this.data.companyName;
  }
}
