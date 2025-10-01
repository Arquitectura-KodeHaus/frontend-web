import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8085/api/auth'; 

  constructor(private http: HttpClient) {}

  // LOGIN con rol
  login(email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password, role });
  }

  // REGISTRO CONSUMIDOR
  registerConsumidor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/consumidor`, data);
  }

  // REGISTRO COMERCIANTE
  registerComerciante(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/comerciante`, data);
  }

  // OBTENER TOKEN
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // OBTENER ROL
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
