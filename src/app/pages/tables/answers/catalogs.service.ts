import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://34.58.102.219:8080/api'; // Ajusta tu URL base
  //private authTokenKey = 'auth_token'; // Key para el token en localStorage

  constructor(
    private http: HttpClient,
    private toastr: NbToastrService,
  ) {}

  // Headers comunes (incluye autenticación si existe)
  private getHeaders(): HttpHeaders {
    //const token = localStorage.getItem(this.authTokenKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      //...(token && { Authorization: `Bearer ${token}` }),
    });
  }

  // ─── Métodos CRUD ─────────────────────────────────────────────────
  get<T>(endpoint: string, params?: any): Observable<T> {
    const options = {
      headers: this.getHeaders(),
      params: new HttpParams({ fromObject: params }),
    };

    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, options).pipe(
      catchError((error) => this.handleError(error)),
    );
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(
      `${this.baseUrl}/${endpoint}`,
      JSON.stringify(body),
      { headers: this.getHeaders() },
    ).pipe(
      catchError((error) => this.handleError(error)),
    );
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(
      `${this.baseUrl}/${endpoint}`,
      JSON.stringify(body),
      { headers: this.getHeaders() },
    ).pipe(
      catchError((error) => this.handleError(error)),
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(
      `${this.baseUrl}/${endpoint}`,
      { headers: this.getHeaders() },
    ).pipe(
      catchError((error) => this.handleError(error)),
    );
  }

  // ─── Manejo de Errores ────────────────────────────────────────────
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente (ej: red)
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = error.error?.message || error.statusText;
      
      // Mostrar notificación de error con Nebular Toastr
      this.toastr.danger(
        error.error?.message || 'Ocurrió un error en el servidor',
        'Error',
        { position: NbGlobalPhysicalPosition.TOP_RIGHT, duration: 5000 },
      );
    }

    return throwError(() => new Error(errorMessage));
  }

  // ─── Métodos Adicionales ──────────────────────────────────────────
  /*
  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  clearAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }
  */
}