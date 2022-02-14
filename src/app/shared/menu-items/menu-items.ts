import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  {
    state: 'facturas',
    type: 'link',
    name: 'Facturas',
    icon: 'local_shipping'
  },
  { state: 'anticipos', type: 'link', name: 'Anticipos', icon: 'assignment_turned_in' },
  { state: 'cancelaciones', type: 'link', name: 'Cancelaciones', icon: 'verified' },
  { state: 'clientes', type: 'link', name: 'Clientes', icon: 'people' },
  
 ];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
