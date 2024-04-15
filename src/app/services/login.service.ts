import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private myAppUrl = 'http://localhost:3000/';
  private myAppApi = 'login/';

  constructor(private http: HttpClient) { }

  getLogin(data:any): Observable<number> {
    return this.http.post<number>(`${this.myAppUrl}${this.myAppApi}`, data);
  }
}
