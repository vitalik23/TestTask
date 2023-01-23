import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetCustomerModel } from 'src/app/models/customers/get.model';
import { UpdateCustomerModel } from 'src/app/models/customers/update.model';
import { GetAllCustomerWithoutFilters, GetCustomer, UpdateCustomer } from '../store/actions/customer.actions';
import { GetAllCustomersState } from '../store/state/get-all.state';
import { GetCustomerState } from '../store/state/get-customer.state';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {

  @Select(GetCustomerState.getCustomer) customer$: Observable<GetCustomerModel>;
  @Select(GetAllCustomersState.getAllCustomers) customers$: Observable<GetCustomerModel[]>;
  
  customers: Array<GetCustomerModel>
  updateModel: UpdateCustomerModel;
  customersName: Array<string>;
  customerId: string;

  updateForm: FormGroup;

  constructor(
    private store: Store,
    private activeRoute: ActivatedRoute
  ) {
    this.updateModel = new UpdateCustomerModel();
    this.customersName = new Array<string>();
    this.customers = new Array<GetCustomerModel>();

    this.updateForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required
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
    });
    
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.customerId = params["id"];
    });
    
    this.customer$.pipe().subscribe((data) => {
      this.setForm(data);
    });

    this.customers$.pipe().subscribe((data) => {
      console.log(data);
      this.customers = data;
    });

    this.store.dispatch(new GetCustomer(this.customerId));
    this.store.dispatch(new GetAllCustomerWithoutFilters());
  }

  public update(){

    this.setUpdateModel();

    console.log(this.updateModel);

    this.store.dispatch(new UpdateCustomer(this.updateModel));
  }

  private setUpdateModel(){
    this.updateModel.id = this.customerId;
    this.updateModel.name = this.updateForm.value.name;
    this.updateModel.email = this.updateForm.value.email;
    this.updateModel.phone = this.updateForm.value.phone;
    this.updateModel.companyName = this.updateForm.value.companyName;
  }

  private setForm(data: GetCustomerModel){

    this.updateForm.controls['name'].setValue(data.name);
    this.updateForm.controls['email'].setValue(data.email);
    this.updateForm.controls['phone'].setValue(data.phone);
    this.updateForm.controls['companyName'].setValue(data.companyName);

  }
}
