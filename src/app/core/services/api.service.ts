import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { config } from '../../config/global';
import { ToastrService } from 'ngx-toastr';
import { AppInjector } from '../helpers/app-injector';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  constructor(
    @Inject('apiUrl') protected url: string,
    protected http : HttpClient
  ) { }

  private apiUrl = config.apiUrl;
  private alertServiceReference: ToastrService = null;

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
      catchError((error) => this.handleErrors(error)) 
    );
  }

  getOne(id: number): Observable<T> {
    return this.http.get<T>(this.apiUrl + this.url + "/" + id).pipe(
      catchError(this.handleErrors)
    );
  }

  create(data: any): Observable<T> {
    return this.http.post<T>(`${ this.apiUrl + this.url }`, data).pipe(
      catchError((error) => this.handleErrors(error)) 
    );
  }


  protected handleErrors(error: any): Observable<any> {
    let errorMessage = 'An unknown error occurred!';

    // if (error.error instanceof ErrorEvent) {
    //   errorMessage = error.error.message;
    // } else {
    //   errorMessage = error.message;
    // }

    console.log(error);

    switch(error.status){
      case 401:
        errorMessage = "Unauthorized."
        break;
      default:
        errorMessage = "Server error!";
    }
    
    //errorMessage = "Server error!";
    this.alertService.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private get alertService(): ToastrService {
    if (!this.alertServiceReference) {
      const injector = AppInjector.getInjector();
      this.alertServiceReference = injector.get(ToastrService);
    }
    return this.alertServiceReference;
  }
}
