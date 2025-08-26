import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { config } from '../../config/global';
import { ToastrService } from 'ngx-toastr';
import { AppInjector } from '../helpers/app-injector';
import { Spinner } from '../functions/spinner';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  constructor(
    @Inject('apiUrl') protected url: string,
    protected http: HttpClient,
  ) { }

  protected apiUrl = config.apiUrl;
  private alertServiceReference: ToastrService = null;

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl + this.url).pipe(
      catchError(this.handleErrors)
    );
  }

  getAllByQueryParams(query: object | string = null): Observable<T[]> {
    const queryUrl: string = this.url.includes('?') ? this.url : `${this.url}?`;
    let queryParams: string = ""

    if (typeof query === "object") {
      queryParams = new URLSearchParams(query as any).toString();
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
      catchError((error) => this.handleErrors(error))
    );
  }

  create(data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl + this.url}`, data).pipe(
      catchError((error) => this.handleErrors(error))
    );
  }

  update(id: number, data: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + this.url + "/" + id, data).pipe(
      catchError((error) => this.handleErrors(error))
    );
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(this.apiUrl + this.url + "/" + id).pipe(
      catchError((error) => this.handleErrors(error))
    );
  }


  protected handleErrors(error: any): Observable<any> {
    let errorMessage = 'An unknown error occurred!';
    let errorFromBack = error.error.error;

    switch (error.status) {
      case 401:
        errorMessage = "Unauthorized."
        break;
      case 404:
        if(errorFromBack){
          errorMessage = errorFromBack;
        }
        else {
        errorMessage = "Not Found."
        }

        break;
      case 422:
        if (error.error) {
          errorMessage = errorFromBack;
          break;
        }
        else {
          errorMessage = "Validation error!";
          for (let i = 0; i < error.error.length; i++) {
            this.alertService.error(error.error[i].error);
          }
        }
        break;
      default:
        if(error.error && errorFromBack) {
          errorMessage = errorFromBack;
        }
        else {
        errorMessage = "Server error!";
        }
    }

    
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
