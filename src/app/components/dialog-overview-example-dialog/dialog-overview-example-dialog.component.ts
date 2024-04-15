import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Empleado } from 'src/app/models/Empleado';


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.css']
})
export class DialogOverviewExampleDialog {

  listaCocineros:string[]=[];

  ngOnInit() {

    // LEER DE LA BASE DE DATOS LA LISTA DE COCINEROS
    for (let index = 1; index <= 10; index++) {
      this.listaCocineros.push('Cocinero ' + index);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Empleado) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
