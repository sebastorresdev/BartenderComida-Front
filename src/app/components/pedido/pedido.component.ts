import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {

  todo = [
    {menu:'Lomo saltado', observacion:'sin cebolla, bastantes papa, arroz sin sal y hechar cremas'},
    {menu:'Ceviche', observacion:'poco aji'},
    {menu:'Arroz con patos', observacion:'presa pierna'},
    {menu:'Seco de cabrito desguesado con frejoles', observacion:'sin menestra'},
    {menu:'Seco de cabrito desguesado con frejoles', observacion:'sin menestra'},
    {menu:'Seco de cabrito desguesado con frejoles', observacion:'sin menestra'},
    {menu:'Seco de cabrito desguesado con frejoles', observacion:'sin menestra'},
    {menu:'Seco de cabrito desguesado con frejoles', observacion:'sin menestra'},
    {menu:'Seco de cabrito desguesado con frejoles', observacion:'sin menestra'}
  ];

  done = [
    {menu:'Lomo saltado', observacion:'sin cebolla'},
    {menu:'Ceviche', observacion:'bastante rocoto'},
    {menu:'Arroz con pato', observacion:''},
    {menu:'Seco a la norteña', observacion:''}
  ];

  finalizado:any [] = [];


  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
