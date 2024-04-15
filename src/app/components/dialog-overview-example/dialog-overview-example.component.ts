import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { Empleado } from 'src/app/models/Empleado';

@Component({
  selector: 'app-dialog-overview-example',
  templateUrl: './dialog-overview-example.component.html',
  styleUrls: ['./dialog-overview-example.component.css']
})
export class DialogOverviewExample implements Empleado {
  
  id= 0;
  cargo='';
  nombreEmpleado= '';
  estado= '';

  constructor(public dialog: MatDialog) {
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: {id:this.id, cargo:this.cargo, nombreEmpleado:this.nombreEmpleado, estado:this.estado}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.nombreEmpleado = result;
    });
  }
}
