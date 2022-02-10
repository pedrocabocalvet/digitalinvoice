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
    icon: 'assignment_turned_in'
  },
  { state: 'busqueda', type: 'link', name: 'Listados', icon: 'view_comfy' },
  { state: 'clientes', type: 'link', name: 'Clientes', icon: 'adb' },
  
 ];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
