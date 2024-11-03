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

  getAllByQueryParams(query: object | string = null): Observable<T[]> {
    const queryUrl: string = this.url.includes('?') ? this.url : `${this.url}?`;
    let queryParams: string = ""

    if(typeof query === "object") {
      queryParams =  new URLSearchParams(query as any).toString();
    }
    else {
      queryParams = query;
    }
   
    return this.http.get<T[]>(this.apiUrl + queryUrl + queryParams).pipe(
      catchError(this.handleErrors)
    );
  }

  create(data: any): Observable<T> {
    return this.http.post<T>(`${ this.apiUrl + this.url }`, data).pipe(
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
