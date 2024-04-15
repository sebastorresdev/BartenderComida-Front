import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/Pedido';
import { Empleado } from 'src/app/models/Empleado';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements Empleado{
  
  pedidosPendientes: Pedido[] = [];

  done: Pedido[] = [];
  pedidoActual :Pedido |undefined;
  finalizado: Pedido[] = [];
  pedidoSeleccionado: Pedido | undefined;
  dato: Pedido | undefined;
  numeroPedido : number = -1;
  contenedorPrevio = '';

  // datos temporales
  animal: string = '';
  name: string = '';

  constructor(public dialog: MatDialog, private _pedidoService: PedidoService) {
  }
  id: number = 0;
  cargo: string = '';
  nombreEmpleado: string = '';
  estado: string = '';

  ngOnInit() {
    this._pedidoService.getTodosLosPedidos().subscribe((data) => {
      this.pedidosPendientes = data;
      console.log(data);
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.contenedorPrevio = event.previousContainer.id;
      this.numeroPedido = event.previousContainer.data[event.previousIndex].id;
      console.log(`Esta saliendo este pedido:${this.numeroPedido}`);
      if (this.contenedorPrevio === 'cdk-drop-list-1') {
        // transferArrayItem(event.previousContainer.data,
        //   event.container.data,
        //   event.previousIndex,
        //   event.currentIndex);
        this.pedidoTerminado(this.numeroPedido);
      }
      else {
        this.openDialog();
      }
    }
  }

  cambiarAPreparacion(numeroPedido: any) {
    const index = this.pedidosPendientes.findIndex(p => p.id == numeroPedido)
    if (index != -1) {
      this.pedidosPendientes[index].estado = 'PROCESO';
      this.done.push(this.pedidosPendientes[index]);
      this.pedidosPendientes.splice(index, 1);
    }
  }

  pedidoTerminado(numeroPedido: any) {
    console.log('si llamo a pedido terminado');
    const index = this.done.findIndex(p => p.id == numeroPedido)
    if (index != -1) {
      this.done[index].estado = 'COMPLETADO';
      this.finalizado.push(this.done[index]);
      this.done.splice(index, 1);
    }
  }

   openDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: {id:this.id, cargo:this.cargo, nombreEmpleado:this.nombreEmpleado, estado:this.estado}
    });
      dialogRef.afterClosed().subscribe(result => {
      this.nombreEmpleado = result;
      
      if (this.contenedorPrevio === 'cdk-drop-list-0' && this.nombreEmpleado !== undefined ) {
        this.cambiarAPreparacion(this.numeroPedido);
        console.log(this.numeroPedido);
        this.nombreEmpleado = '';
      }
      if (this.contenedorPrevio === 'cdk-drop-list-1' && this.nombreEmpleado !== undefined) {
        this.pedidoTerminado(this.numeroPedido);
        console.log(this.numeroPedido);
      }
        
    });
  }
}
