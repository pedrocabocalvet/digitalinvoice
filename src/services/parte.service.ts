import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Parte } from '../model/parte';
import { AppSettings } from '../model/appSettings';
import { Busqueda } from '../model/busqueda';

@Injectable()
export class ParteService{
  constructor(
    private http: HttpClient,
  ) {}

  partes: Observable<Parte[]>;

  public getPartes() {
    return this.http.get<Parte[]>(AppSettings.URL + 'parte/getall');
  }

  public deleteParte(id) {
    console.log('borrando ' + AppSettings.URL + 'parte/delete/' + id);
    return this.http.delete(AppSettings.URL + 'parte/delete/' + id).subscribe(result => {
      console.log("Parte borrado!");
    });
  }

  public createParte(parte: Parte) {
    console.log('guardando...');
    console.log(JSON.stringify(parte));
    return this.http.post<Parte>(AppSettings.URL + 'parte/create', parte).subscribe(result => {
      console.log("Parte creado!");
    })
  }

  public busquedaNuevos(busqueda: Busqueda) {
    console.log('buscando...');
    console.log(JSON.stringify(busqueda));
    return this.http.post<Parte[]>(AppSettings.URL + 'parte/busqueda', busqueda);
  }

  public getParteById(id) {
    return this.http.get<Parte>(AppSettings.URL + 'parte/get/' + id);
  }

  public getNuevoParte(){
    return this.http.get<Parte>(AppSettings.URL + 'parte/new');
  }

  public updateParte(parte) {
    return this.http.put<Parte>(AppSettings.URL + 'parte/update/' + parte.id, parte);
  }

}
