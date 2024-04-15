import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PedidoService } from 'src/app/services/pedido.service';


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.css']
})
export class DialogOverviewExampleDialog {

  listaCocineros:Empleado[]=[];

  ngOnInit() {
    this._empleadoService.getChefDisponibles().subscribe((data) => {
      this.listaCocineros = data;
    })
  }

  constructor(
    private _empleadoService:EmpleadoService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Empleado) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
