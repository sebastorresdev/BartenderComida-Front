import { Component, Input } from '@angular/core';

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
}
