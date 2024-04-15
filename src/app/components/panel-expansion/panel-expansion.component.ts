import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { Pedido } from 'src/app/models/Pedido';
import { Empleado } from 'src/app/models/Empleado';

@Component({
  selector: 'app-panel-expansion',
  templateUrl: './panel-expansion.component.html',
  styleUrls: ['./panel-expansion.component.css']
})
export class PanelExpansionComponent implements Empleado {

  panelOpenState = false;
  @Input() pedido : Pedido | undefined;
  @Input() accion : string | undefined;
  @Output() mensajeEnviado = new EventEmitter<string>();

  chefSeleccionado : Empleado | undefined;

  constructor(public dialog: MatDialog) {
    this.actualizarTiempo();
  }
  id: number = 0;
  cargo: string = '';
  nombreEmpleado: string = '';
  estado: string = '';

  ngOnInit():void {
  }

  actualizarTiempo():void {
    setInterval(() => {
      if (this.pedido !== undefined) {
        this.pedido!.tiempo += 1;
      }
    }, 1000);
  }

  openDialog(): void {
    if (this.accion !== 'Finalizar') {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '400px',
        data: {id:this.id, cargo:this.cargo, nombreEmpleado:this.nombreEmpleado, estado:this.estado}
      });
          dialogRef.afterClosed().subscribe(result => {
          this.chefSeleccionado = result;
          this.mensajeEnviado.emit(this.pedido?.id);
      });
    }else {
      this.mensajeEnviado.emit(this.pedido?.id);
    }
  }
}
