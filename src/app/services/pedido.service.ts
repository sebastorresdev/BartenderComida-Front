import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private myAppUrl = 'http://localhost:3000/';
  private myAppApi = 'pedidos/';

  constructor(private http: HttpClient) { }

  getTodosLosPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.myAppUrl}${this.myAppApi}`);
  }

}
