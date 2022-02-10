import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';
import { Customer } from '../../../model/customer';
import { ClienteService } from '../../../services/cliente.service';
import { Busqueda } from '../../../model/busqueda';
import { ParteService } from '../../../services/parte.service';
import { Observable } from 'rxjs';
import { DateAdapter } from '@angular/material';
import { Parte } from '../../../model/parte';
import * as moment from 'moment';
import * as XLSX from 'xlsx'
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

	ngOnInit(): void {}

	busqueda : Busqueda;
	partes: Observable<Parte[]>;

	clientes: Observable<Customer[]>;
	cliente: Customer;

	dateFormat = 'DD/MM/YYYY';
	fechaCreacion: any;
	fechaPedidoIni: Date;
  	fechaPedidoFin: Date;
	fechaFacturaIni: Date;
 	fechaFacturaFin: Date;
	fechaFabricaIni: Date;
  	fechaFabricaFin: Date;
	ordenVentasIni: Date;  
	ordenVentasFin: Date;  
	cmrIni: Date;  
	cmrFin: Date;  
	
	panelOpenState = false;
	step = 0;

	settings = {
	  actions: {
		columnTitle: 'Acciones',
		position: 'right',
		add: false,
		edit: false,
		delete: false,
		class: 'align-center',
	  },
	  pager:{
		perPage: 100
	  },
	  columns: {
		numPedido: {
		  title: 'Pedido',
		  width: '5%',
		  class: 'align-center',
		},
		fechaPedido: {
		  title: 'F. Pedido',
		  width: '8%',
		  class: 'align-center',
		  type: 'html',
		  valuePrepareFunction: (value) => {
			return moment(value).format('DD-MM-YYYY');
		  },
		  filter: false
		},
		modelo: {
			title: 'Modelo',
			width: '8%',
			class: 'align-center',
		},
		motor: {
			title: 'Motor',
			width: '8%',
			class: 'align-center',
		},
		fechaFabrica: {
			title: 'F. Volvo',
			width: '8%',
			class: 'align-center',
			type: 'html',
			valuePrepareFunction: (value) => {
			  return moment(value).format('DD-MM-YYYY');
			},
			filter: false
		},
		cmr: {
			title: 'CMR',
			width: '8%',
			class: 'align-center',
			type: 'html',
			valuePrepareFunction: (value) => {
			  return moment(value).format('DD-MM-YYYY');
			},
			filter: false
		},
		om: {
			title: 'OM',
			width: '8%',
			class: 'align-center',
		},
		fechaSolCompra: {
			title: 'F. Solicitud',
			width: '8%',
			class: 'align-center',
			type: 'html',
			valuePrepareFunction: (value) => {
			  return moment(value).format('DD-MM-YYYY');
			},
			filter: false
		},
		fechaFactura: {
			title: 'F. Venta',
			width: '8%',
			class: 'align-right',
			type: 'html',
			valuePrepareFunction: (value) => {
			  return moment(value).format('DD-MM-YYYY');
			},
			filter: false
		},
		numFactura: {
			title: 'Nº Factura',
			width: '8%',
			class: 'align-center',
		},
		cliente: {
		  title: 'Cliente',
		  width: '15%',
		  class: 'align-center',
		},
		numBastidor: {
			title: 'Bastidor',
			width: '8%',
			class: 'align-center',
		  },		
		numChasis: {
		  title: 'Chasis',
		  width: '8%',
		  class: 'align-center',
		},		
		vendedor: {
		  title: 'Vendedor',
		  width: '8%',
		  class: 'align-center',
		},
		vehiculoUsado: {
		  title: 'V.Usado',
		  width: '8%',
		  class: 'align-center',
		}
	  },	  
	  attr: {
		class: 'table table-bordered'
	  },
	  noDataMessage: '',
	};


	constructor(public clienteService: ClienteService, private parteService: ParteService,  private router : Router,
		private route: ActivatedRoute, private dateAdapter: DateAdapter<Date> ) { 
		 
	  this.dateAdapter.setLocale('en-GB');   
	  this.clientes = this.clienteService.getClientes();
	  this.busqueda = new Busqueda();

	 }

	 select(event){

		this.clienteService.getClienteById(event).subscribe(resultCli => {
		  console.log(resultCli);
		  this.busqueda.cliente = resultCli.nombre;
		  console.log(this.busqueda.cliente);
		});
		
	  }

	  search(){

		console.log(this.busqueda);

		if(this.fechaPedidoIni != undefined){		
			this.busqueda.fechaPedidoIni = this.fechaPedidoIni.getTime().toString();
		}
		if(this.fechaPedidoFin != undefined){		
			this.busqueda.fechaPedidoFin = this.fechaPedidoFin.getTime().toString();
		}
		if(this.ordenVentasIni != undefined){		
			this.busqueda.ordenVentasIni = this.ordenVentasIni.getTime().toString();
		}
		if(this.ordenVentasFin != undefined){		
			this.busqueda.ordenVentasFin = this.ordenVentasFin.getTime().toString();
		}
		if(this.cmrIni != undefined){		
			this.busqueda.cmrIni = this.cmrIni.getTime().toString();
		}
		if(this.cmrFin != undefined){		
			this.busqueda.cmrFin = this.cmrFin.getTime().toString();
		}


		this.partes = this.parteService.busquedaNuevos(this.busqueda);
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

	  public delete(event) {
		if (window.confirm('¿Estas seguro que quieres borrar el parte seleccionado?')) {
		  this.parteService.deleteParte(event.data.id);
		  event.confirm.resolve();
		} else {
		  event.confirm.reject();
		}
	  }

	  public edit(event) {      
		this.router.navigate(['/parte', event.data.id]);  
	  }

	  exportexcel(): void {
       /* table id is passed over here */   
       let element = document.getElementById('resultados'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, 'Listado.xlsx');
	}

	public downloadAsPDF() {
		const doc = new jsPDF('landscape');

		const head = [['Pedido', 'F.Pedido', 'Modelo', 'Motor', 'F.Volvo', 'CMR', 'OM', 'Solicitud', 'Venta', 'Factura', 'Cliente', 'Bastidor', 'Chasis', 'Vend.', 'Usado' ]];
		let data = [];

		this.partes.subscribe(rstParte =>{
			let aPartes : Parte[] = rstParte;
			aPartes.forEach(iparte => {
				let row = [ iparte.numPedido, moment(iparte.fechaFabrica).format('DD-MM-YYYY'), iparte.modelo, iparte.motor,
				moment(iparte.fechaFabrica).format('DD-MM-YYYY'), moment(iparte.cmr).format('DD-MM-YYYY'), iparte.om,
				moment(iparte.fechaSolCompra).format('DD-MM-YYYY'), moment(iparte.fechaFactura).format('DD-MM-YYYY'), iparte.numFactura,
				iparte.cliente, iparte.numBastidor, iparte.numChasis, iparte.vendedor, iparte.vehiculoUsado
			 ];
				data.push(row);
			});

			console.log(data);
			autoTable(doc, {
				head: head,
				body: data,
				theme: "grid",
				columnStyles: { 
					0: { halign: 'center', fontSize: 8 },
					1: { halign: 'center', fontSize: 8 },
					2: { halign: 'center', fontSize: 8 },
					3: { halign: 'center', fontSize: 8 },
					4: { halign: 'center', fontSize: 8 },
					5: { halign: 'center', fontSize: 8 },
					6: { halign: 'center', fontSize: 8 },
					7: { halign: 'center', fontSize: 8 },
					8: { halign: 'center', fontSize: 8 },
					9: { halign: 'center', fontSize: 8 },
					10: { halign: 'center', fontSize: 8 },
					11: { halign: 'center', fontSize: 8 },
					12: { halign: 'center', fontSize: 8 },
					13: { halign: 'center', fontSize: 8 },
					14: { halign: 'center', fontSize: 8 },

				},
				didDrawPage: (dataArg) => { 
				 doc.text('Sercatrans', dataArg.settings.margin.top, 10);
				}
		   }); 
		  
		  doc.save('table.pdf');
			//
		});

		
		

	}

}



