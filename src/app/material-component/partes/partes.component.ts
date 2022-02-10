import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ParteService } from '../../../services/parte.service';
import { Parte } from '../../../model/parte';
import * as moment from 'moment';
import { ClienteService } from '../../../services/cliente.service';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Factura } from '../../../model/factura';
import { Customer } from '../../../model/customer';

@Component({
  selector: 'app-partes',
  templateUrl: './partes.component.html',
  styleUrls: ['./partes.component.css']
})
export class PartesComponent  {

  
  itemsCollection: AngularFirestoreCollection<Factura>;
  facturas: Observable<Factura[]>;


  settings = {
    pager:{
      perPage: 15
    },
    actions: {
      columnTitle: 'Acciones',
      position: 'right',
      add: false,
      edit: false,
      class: 'align-center',
    },
    columns: {
      empresa: {
        title: 'Empresa',
        width: '30%',
        class: 'align-center',
      },
      fecha: {
        title: 'Fecha',
        width: '10%',
        class: 'align-center',
        type: 'html',
        valuePrepareFunction: (value) => {
          return moment(value).format('DD-MM-YYYY');
        },
        filter: false
      },
      serie: {
        title: 'Serie',
        width: '10%',
        class: 'align-center',
      },
      numero: {
        title: 'Número',
        width: '10%',
        class: 'align-center',
      },
      importe: {
        title: 'Importe',
        width: '18%',
        class: 'align-center',
      }
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<center>Borrar</center>',
      cancelButtonContent: '<center>Cancelar</center>'
    },
    attr: {
      class: 'table table-bordered'
    },
    noDataMessage: '',
  };

  constructor(private afs: AngularFirestore, public router: Router){ 

    this.itemsCollection = afs.collection<Factura>('facturas');
    this.facturas=this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Factura;
        const id = a.payload.doc.id;
        data.id = id;
        return { id, ...data };
      }))
    );

  }   

  ngOnInit(): void {

    this.facturas.subscribe(facturas =>{

      facturas.forEach(factura =>{

        let clienteObs = this.afs.doc<Customer>('usuarios/' + factura.idCliente).valueChanges();
        clienteObs.subscribe(rst => {
          console.log('empresa... ');
          console.log(rst.nombre);
          factura.empresa = rst.nombre;
        })

      })

    }) 
  } 

  public edit(event) {      
    this.router.navigate(['/parte', event.data.id]);  
  }

  public create(event){
    this.router.navigate(['/parte', 0]);
  }
  public busca(){
    this.router.navigate(['/busqueda']);
  }


  public delete(event) {
    console.log('borramos ' + event);
    if (window.confirm('¿Estas seguro que quieres borrar el cliente seleccionado?')) {

     /* this.clienteService.deleteCliente(event.data.codcliente).subscribe(result => {
        console.log("Cliente borrado!");
        event.confirm.resolve();
      }); */

    } else {
      //event.confirm.reject();
    }
  } 
  

}

