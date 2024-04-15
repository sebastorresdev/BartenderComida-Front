import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/Pedido';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements Empleado{
  
  pedidosPendientesTmp : Pedido[] = [];
  subCategorias : string[] =[];

  pedidosPendientes: Pedido[] = [];
  done: Pedido[] = [];
  pedidoActual :Pedido |undefined;
  finalizado: Pedido[] = [];
  pedidoSeleccionado: Pedido | undefined;
  dato: Pedido | undefined;
  numeroPedido : number = -1;
  contenedorPrevio = '';


  constructor(public dialog: MatDialog, private _pedidoService: PedidoService, private _empleadoService:EmpleadoService) {
  }
  id: number = 0;
  cargo: string = '';
  nombreEmpleado: string = '';
  estado: boolean = true;

  ngOnInit() {
    this.obtenerTodosLosPedidos();
  }

  obtenerTodosLosPedidos() {
    this._pedidoService.getTodosLosPedidos().subscribe((data) => {
      this.pedidosPendientes = data;
      this.pedidosPendientesTmp = data;
      const subCategoriasUnicas = new Set(this.pedidosPendientes.map(p => p.subcategoria));
      console.log(subCategoriasUnicas);
      this.subCategorias = [...subCategoriasUnicas];
      console.log(this.subCategorias);
    })
  }

  obtenerTodosLosPedidoEnProceso() {
    this._pedidoService.getTodosLosPedidos().subscribe((data) => {
      this.pedidosPendientes = data;
      
    })
  }

  filtrarPorSubCategorias(event: MatSelectChange) {
    console.log(event);
    this.pedidosPendientes = this.pedidosPendientesTmp;
    if (event.value !== undefined) {
      this.pedidosPendientes = this.pedidosPendientes.filter(p => p.subcategoria == event.value);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.contenedorPrevio = event.previousContainer.id;
      this.numeroPedido = event.previousContainer.data[event.previousIndex].id;
      if (this.contenedorPrevio === 'cdk-drop-list-1') {
        this.pedidoTerminado(this.numeroPedido);
      }
      else {
        this.openDialog();
      }
    }
  }

  cambiarAPreparacion(numeroPedido:any) {
    const index = this.pedidosPendientes.findIndex(p => p.id == numeroPedido)
    if (index != -1) {
      this.pedidosPendientes[index].estado = 'PROCESO';
      if (this.pedidosPendientes[index].nombreChef === null)
        this.pedidosPendientes[index].nombreChef = this.nombreEmpleado;
      this.done.push(this.pedidosPendientes[index]);
      this.pedidosPendientes.splice(index, 1);
    }
  }

  pedidoTerminado(numeroPedido: any) {
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
      this.nombreEmpleado = result.nombreEmpleado;
      if (this.contenedorPrevio === 'cdk-drop-list-0' && this.nombreEmpleado !== undefined ) {
        this.cambiarAPreparacion(this.numeroPedido);
      }
    });
  }

  ordenarListadoPendiente() {
    this.ordenarPorNombreProducto(this.pedidosPendientes);
  }

  ordenarPedidoEnProceso() {
    this.ordenarPorNombreProducto(this.done);
  }
  ordenarPedidoCompletados() {
    this.ordenarPorNombreProducto(this.finalizado);
  }
  ordenarPorNombreProducto(data:Pedido[]) {
    data.sort((a, b) => {
      if (a.nombreProducto < b.nombreProducto) {
        return -1; // a debe ir antes que b
      }
      if (a.nombreProducto > b.nombreProducto) {
        return 1; // b debe ir antes que a
      }
      return 0; // a y b son iguales
    });
  }
}
