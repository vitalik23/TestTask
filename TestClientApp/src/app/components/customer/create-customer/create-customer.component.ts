import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CreateCustomerModel } from 'src/app/models/customers/create.model';
import { GetCustomerModel } from 'src/app/models/customers/get.model';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CreateCustomer, GetAllCustomerWithoutFilters } from '../store/actions/customer.actions';
import { GetAllCustomersState } from '../store/state/get-all.state';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  @Select(GetAllCustomersState.getAllCustomers) customers$: Observable<GetCustomerModel[]>;
  createModel: CreateCustomerModel;

  customersName: Array<string>;

  createForm: FormGroup;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<CreateCustomerComponent>,
    private alertService: AlertifyService
  ) {
    this.createModel = new CreateCustomerModel();
    this.customersName = new Array<string>();

    this.createForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        this.checkNameInUnique()
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl(null, Validators.required),
      companyName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ])
    })
   }

  ngOnInit(): void {
    this.customers$.pipe().subscribe((data) => {
      this.customersName = data.map(el => el.name);

      console.log(this.customersName);

    });

    this.store.dispatch(new GetAllCustomerWithoutFilters());
  }

  public create(){

    if(this.createForm.invalid){
      this.alertService.error("You have entered incorrect data!");
      return;
    }

    this.setCreateModel();

    this.store.dispatch(new CreateCustomer(this.createModel));
    this.close();
  }

  public close(){
    this.dialogRef.close();
  }

  private setCreateModel(){
    this.createModel.name = this.createForm.value.name;
    this.createModel.email = this.createForm.value.email;
    this.createModel.phone = this.createForm.value.phone;
    this.createModel.companyName = this.createForm.value.companyName;
  }

  private checkNameInUnique(){
    return (control: AbstractControl) : ValidationErrors | null => {
      
      return this.customersName.includes(control.value) ? { 'duplicate': true } : null;
    }
  }

}
