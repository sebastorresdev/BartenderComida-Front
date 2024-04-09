import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {

  todo = [
    {menu:'Lomo saltado', observacion:'sin cebolla, bastantes papa, arroz sin sal y hechar cremas',numeroMesa : 1, pedido:'1001'},
    {menu:'Ceviche', observacion:'poco aji', numeroMesa:2, pedido:'1003'},
    {menu:'Arroz con patos', observacion:'presa pierna', numeroMesa:3, pedido:'1012'},
    {menu:'Seco de cabrito desguesado con frejoles', observacion:'', numeroMesa:3, pedido:'1012'},
    {menu:'Seco de cabrito desguesado con frejoles', observacion:'sin menestra', numeroMesa:3, pedido:'1012'},
    {menu:'Seco de cabrito desguesado con frejoles', observacion:'sin menestra', numeroMesa:3, pedido:'1012'},
    {menu:'Seco de cabrito desguesado con frejoles', observacion:'', numeroMesa:3, pedido:'1012'},
    {menu:'Seco de cabrito desguesado con frejoles', observacion:'sin menestra', numeroMesa:3, pedido:'1012'},
    {menu:'Seco de cabrito desguesado con frejoles', observacion:'sin menestra', numeroMesa:3, pedido:'1012'},
    {menu:'Arroz con patos', observacion:'', numeroMesa:5, pedido:'1011'},
    {menu:'Arroz con patos', observacion:'presa pierna', numeroMesa:5, pedido:'1011'},
    {menu:'Arroz con patos', observacion:'presa pierna', numeroMesa:5, pedido:'1011'}
  ];

  done: any[] = [];

  finalizado:any [] = [];
  
  dato : any;

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
