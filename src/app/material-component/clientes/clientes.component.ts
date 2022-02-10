
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { Customer } from '../../../model/customer';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'button-view',
  template: `
    <button (click)="onClick()"> Nueva Factura</button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(public router: Router){ 
    
  }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
      this.router.navigate(['/parte', 'c_' + this.rowData.id]);
  // this.save.emit(this.rowData);
  }
}



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  settings = {

    actions: {
      columnTitle: 'Acciones',
      position: 'right',
      edit: false,
      add: false
    },
    columns: {
      custom: {
        title: '',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            
            //alert(`${row.nombre} saved!`)
          });
        }
      },
      nombre: {
        title: 'Empresa',
        width: '30%',
        class: 'align-center',
      },
      cif: {
        title: 'CIF',
        width: '15%',
        class: 'align-center',
      },
      telefono: {
        title: 'Teléfono',
        width: '15%',
        class: 'align-center',
      },
      email: {
        title: 'Email',
        editable: false,
        width: '15%',
        class: 'align-center',
      },
     
    },
    delete :{
      confirmDelete: true,
      deleteButtonContent: '<center>Borrar</center>',
      cancelButtonContent: '<center>Cancelar</center>'
    },        
    attr: {
      class: 'table table-bordered'
    },
    noDataMessage: '',
  };



  itemsCollection: AngularFirestoreCollection<Customer>;
  clientes: Observable<Customer[]>;


  constructor(private afs: AngularFirestore, public router: Router){ 

    this.itemsCollection = afs.collection<Customer>('usuarios');
    this.clientes=this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Customer;
        const id = a.payload.doc.id;
        data.id = id;
        return { id, ...data };
      }))
    );
   // this.clientes = this.itemsCollection.valueChanges();

  }

  ngOnInit(): void { }

  public updateCliente(event)  {
    //console.log(event.newData.uid);
    if (window.confirm('¿Estas seguro que quieres modificar el cliente?')) {
      let cliente = event.newData;
      cliente.id = event.data.uid;
    //  this.clienteService.updateCliente(cliente);
      event.confirm.resolve();
    } else  {
      event.confirm.reject();
    }
  }

  public edit(event) {
    console.log(event.data);
    this.router.navigate(['/cliente', event.data.id]);
  }

  newParte(event) {
    console.log(event);
    this.router.navigate(['/cliente', 0]);
  /*  if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }*/
  }

  public newClient(event){
    this.router.navigate(['/cliente', 0]);
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
