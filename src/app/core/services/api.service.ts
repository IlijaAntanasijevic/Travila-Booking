import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { config } from '../../config/global';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {

  constructor(
    @Inject('apiUrl') protected url: string,
    protected http : HttpClient
  ) { }

  private apiUrl = config.apiUrl;

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl + this.url).pipe(
      catchError(this.handleErrors)
    );
  }

  private handleErrors(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage); 
    return throwError(() => new Error(errorMessage));
  }
}
