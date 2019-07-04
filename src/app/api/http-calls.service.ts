import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from './encoder';
import { Observable } from 'rxjs';
import { Configuration } from '../../environments/configuration';
import { environment } from '../../environments/environment'
import { BASE_PATH } from '../../environments/variables';
import { EmployeeResponse } from '../models/employeResponse.model';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  protected basePath = '';
  public defaultHeaders = new HttpHeaders(); // there default headers can be set on this
  public configuration = new Configuration(); 

  constructor(private httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  public addEmployee(obj): Observable<any> {
    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    //setting up query params
    let headers = this.defaultHeaders;
    // authentication (OauthSecurity) required
    if (environment.access_token) {
      headers = headers.set('Authorization', 'Bearer ' + environment.access_token);
    }
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'application/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
    ];

    return this.httpClient.post<any>(`${this.basePath}/users`, obj,
      {
        params: queryParameters,
        headers: headers
      }
    );
  }


  public editEmployee(obj, id): Observable<any> {
    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    let headers = this.defaultHeaders;
    // authentication (OauthSecurity) required
    if (environment.access_token) {
      headers = headers.set('Authorization', 'Bearer ' + environment.access_token);
    }
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'application/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }
    return this.httpClient.patch<any>(`${this.basePath}/users/${id}`, obj,
      {
        params: queryParameters,
        headers: headers
      }
    );
  }



  public deleteEmployee(id: string): Observable<any> {
    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });

    let headers = this.defaultHeaders;
    // authentication (OauthSecurity) required
    if (environment.access_token) {
      headers = headers.set('Authorization', 'Bearer ' + environment.access_token);
    }
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'application/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    return this.httpClient.delete<any>(`${this.basePath}/users/${id}`,
      {
        params: queryParameters,
        headers: headers
      }
    );
  }



  public getEmployeeList(): Observable<any> {
    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });

    let headers = this.defaultHeaders;
    // authentication (OauthSecurity) required
    if (environment.access_token) {
      headers = headers.set('Authorization', 'Bearer ' + environment.access_token);
    }
    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'application/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
    ];

    return this.httpClient.get<EmployeeResponse[]>(`${this.basePath}/users`,
      {
        params: queryParameters,
        headers: headers
      }
    );
  }

}

