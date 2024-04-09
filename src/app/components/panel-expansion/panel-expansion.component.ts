import { Component, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';

@Component({
  selector: 'app-panel-expansion',
  templateUrl: './panel-expansion.component.html',
  styleUrls: ['./panel-expansion.component.css']
})
export class PanelExpansionComponent {

  panelOpenState = false;
  @Input() content = '';
  @Input() observacion = '';
  @Input() tiempo = '00:00';
  @Input() estado = 'Pendiente';
  @Input() accion = '';
  @Input() chef = '';
  @Input() numeroMesa = 1;
  @Input() numeroPedido = '';

  constructor(public dialog: MatDialog) {    
  }

  animal: string='';
  name: string='';
  minuto = 0;
  segundo = 0;

  ngOnInit():void {
    this.actualizarTiempo();
  }

  actualizarTiempo():void {
    setInterval(() => {
      const minutos = this.formatoDosDigitos(this.minuto);
      const segundos = this.formatoDosDigitos(this.segundo);
      this.tiempo = `${minutos}:${segundos}`;
      
      this.segundo++;
      if (this.segundo > 59) {
        this.minuto++;
        this.segundo = 0;
      }
      if (this.minuto > 59) {
        this.minuto = 0;
      }

    }, 1000);
  }

  formatoDosDigitos(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
      alert('selecciono el cocinero:' + this.animal)
    });
  }
}
