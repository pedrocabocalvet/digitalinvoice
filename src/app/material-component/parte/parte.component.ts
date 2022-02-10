import { Component, OnInit } from '@angular/core';
import { Parte } from '../../../model/parte';
import { Customer } from '../../../model/customer';
import { Observable } from 'rxjs';
import { Router,  ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material';
import * as moment from 'moment';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { Factura } from '../../../model/factura';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-parte',
  templateUrl: './parte.component.html',
  styleUrls: ['./parte.component.css']
})
export class ParteComponent implements OnInit {

      
  itemsCollection: AngularFirestoreCollection<Factura>;
  clientesCollection: AngularFirestoreCollection<Customer>;

  clienteObs : Observable<Customer>;
  clientes: Observable<Customer[]>;
  cliente: Customer;

  idFactura : string;
  facturaObs : Observable<Factura>;
  factura: Factura;
  esNuevaFactura = true;

  dateFormat = 'DD/MM/YYYY';
  fechaCreacion: any;
  fechaFactura: Date;

  panelOpenState = false;
  step = 0;

  downloadURL!: Observable<string>;
  uploadPercent!: Observable<number | undefined>;
  url: string;
  
  files: File[] = [];

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private router : Router,
         private route: ActivatedRoute, private dateAdapter: DateAdapter<Date> ) { 
       
    this.itemsCollection = afs.collection<Factura>('facturas');
    this.clientesCollection = afs.collection<Customer>('usuarios');
    this.dateAdapter.setLocale('en-GB');  
    this.factura = new Factura();
   
    //Cargamos Clientes
    this.clientes=this.clientesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Customer;
        const id = a.payload.doc.id;
        data.id = id;
        return { id, ...data };
      }))
    );

    console.log('Clientes...');
    console.log(this.clientes);
    //

    this.route.params.subscribe(params => {

      console.log(params);
      let parametro: string = params['id'];
      if(parametro && parametro.startsWith('c')){

          console.log('Id Cliente: '+ parametro.substr(2));
          
          this.factura.idCliente = parametro.substr(2);
          
          if(this.factura.idCliente != undefined && this.factura.idCliente){
              console.log('buscamos cliente..' + this.factura.idCliente);
              this.clienteObs = afs.doc<Customer>('usuarios/' +  this.factura.idCliente).valueChanges();
              this.clienteObs.subscribe(rst => {
                this.cliente = rst;
                console.log(this.cliente);
              });
          } 
       
      }else{
        //this.idParte = Number(parametro);
      }

      
      if(this.idFactura != undefined && this.idFactura && this.idFactura != '0'){
        this.esNuevaFactura=false;
        console.log('buscamos Factura..');
        this.facturaObs = afs.doc<Factura>('facturas/' + this.idFactura).valueChanges();
        this.facturaObs.subscribe(rst => {
          this.factura = rst;
        })
      }

    });   
    
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

  select(event){
    
    /*this.clienteService.getClienteById(event).subscribe(resultCli => {
      console.log(resultCli);
      this.parte.cliente = resultCli.nombre;
      console.log(this.parte.cliente);
    });*/
    
  }

  save(){

    if(this.facturaObs ){
      console.log('actualizamos');
      this.afs.doc<Factura>('facturas/' + this.idFactura).update(this.factura);
    }else{
      this.itemsCollection.add({...this.factura}); 
    }
      
    this.router.navigate(['/facturas']);    
  }


  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }

  uploadFile(event: any) {

    for (let i = 0; i < event.target.files.length; i++) {
    
      const file = event.target.files[i];
      const filePath = 'sercatrans/' + file.name;
      var storageRef =   this.storage.ref(filePath);
     
      const task = this.storage.upload(filePath, file);
  
  
      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
    
      task.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(rst => {
            this.url = rst;
            console.log(rst);
          })
          
        })
      ).subscribe();

    
    }
  
  }


  onSelect(event) {

    console.log(event);

    this.files.push(...event.addedFiles);


    for (let i = 0; i < this.files.length; i++) {
    
      const file = this.files[i];
      const filePath = 'sercatrans/' + file.name;
      var storageRef =   this.storage.ref(filePath);
     
      const task = this.storage.upload(filePath, file);
  
  
      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
    
      task.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(rst => {
            this.url = rst;
            console.log(rst);
          })
          
        })
      ).subscribe();
    
    }
    
}



  onRemove(event) {

      console.log(event);

      this.files.splice(this.files.indexOf(event), 1);

  }
  


}
