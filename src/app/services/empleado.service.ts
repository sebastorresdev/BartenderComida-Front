import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private myAppUrl = 'http://localhost:3000/';
  private myAppApi = 'empleado/chef';

  constructor(private http: HttpClient) { }

  getChefDisponibles(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.myAppUrl}${this.myAppApi}`);
  }
}
