import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Customer } from '../model/customer';
import { AppSettings } from '../model/appSettings';

@Injectable()
export class ClienteService{
  constructor(
    private http: HttpClient,
  ) {}

  partes: Observable<Customer[]>;

  public getClientes() {
    return this.http.get<Customer[]>(AppSettings.URL + 'customer/getall');
  }

  public deleteCliente(id) {
    return this.http.delete(AppSettings.URL + 'customer/delete/' + id);
  }

  public save(customer: Customer) {
    console.log('guardando...');
    console.log(JSON.stringify(customer));
    return this.http.post<Customer>(AppSettings.URL + 'customer/create', customer);
  }

  public getClienteById(id) {
    return this.http.get<Customer>(AppSettings.URL + 'customer/get/' + id);
  }

  public updateCliente(customer) {
    return this.http.put<Customer>(AppSettings.URL + 'customer/update/' + customer.id, customer);
  }

}
