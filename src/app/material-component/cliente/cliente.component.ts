import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Customer } from '../../../model/customer';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Customer>;

  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }

  idCliente : string;
  clienteObs : Observable<Customer>;
  cliente: Customer;
  esNuevoCliente = true;

  panelOpenState = false;
  step = 0;

  constructor(private afs: AngularFirestore, private router : Router, private route: ActivatedRoute) {
    
    this.itemsCollection = afs.collection<Customer>('usuarios');

    this.route.params.subscribe(params => {

      this.idCliente = params['id'];
      console.log('Customer ' + this.idCliente);
      this.cliente = new Customer();
      this.cliente.nombre = '';
      
      if(this.idCliente != undefined && this.idCliente && this.idCliente != '0'){
        this.esNuevoCliente=false;
        console.log('buscamos cliente..');
        this.clienteObs = afs.doc<Customer>('usuarios/' + this.idCliente).valueChanges();
        this.clienteObs.subscribe(rst => {
          this.cliente = rst;
        })
      }
     
     
    });

   }

   saveCliente(){

    if(this.clienteObs ){
      console.log('actualizamos');
      this.afs.doc<Customer>('usuarios/' + this.idCliente).update(this.cliente);
    }else{
      this.itemsCollection.add({...this.cliente}); 
    }
   
   
    this.router.navigate(['/clientes']);
  }
 
   setStep(index: number) {
     this.step = index;
   }
 
   nextStep() {
     this.step++;
   }
 
   prevStep() {
     this.step--;
   }


/***
 * <br>
  <input type="file" multiple (change)="uploadFile($event)">
  <div> {{ uploadPercent | async }} % subido...</div>
    <a [href]="downloadURL | async">Descargat {{ downloadURL | async }}</a>
 * 
 */

}


