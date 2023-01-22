import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guard/auth-guard.service';
import { GetListComponent } from './get-list/get-list.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';

const routes: Routes = [
  { path: 'get-list', component: GetListComponent, canActivate: [AuthGuardService] },
  { path: 'update/:id', component: UpdateCustomerComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
