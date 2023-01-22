import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateCustomerModel } from '../models/customers/create.model';
import { Observable } from 'rxjs';
import { GetCustomerModel } from '../models/customers/get.model';
import { environment } from 'src/environments/environment';
import { UpdateCustomerModel } from '../models/customers/update.model';
import { FilteredAndPagedCustomerModel } from '../models/customers/filtered-and-paged.model';
import { PagedResponse } from '../models/pagination/page-response.models';


@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(
        private http: HttpClient
    ) { }

    public create(model: CreateCustomerModel): Observable<GetCustomerModel>{
        return this.http.post<GetCustomerModel>(`${environment.apiUrl}/customer/create`, model);
    }

    public update(model: UpdateCustomerModel): Observable<GetCustomerModel>{
        return this.http.post<GetCustomerModel>(`${environment.apiUrl}/customer/update`, model);
    }

    public delete(id: string){
        return this.http.get(`${environment.apiUrl}/customer/delete/${id}`);
    }

    public get(id: string): Observable<GetCustomerModel>{
        return this.http.get<GetCustomerModel>(`${environment.apiUrl}/customer/get/${id}`);
    }

    public getAll(model: FilteredAndPagedCustomerModel): Observable<PagedResponse<GetCustomerModel>>{
        return this.http.post<PagedResponse<GetCustomerModel>>(`${environment.apiUrl}/customer/get-all`, model);
    }

    public getAllWithoutFilters(): Observable<Array<GetCustomerModel>>{
        return this.http.get<Array<GetCustomerModel>>(`${environment.apiUrl}/customer/get-all`);
    }
}
