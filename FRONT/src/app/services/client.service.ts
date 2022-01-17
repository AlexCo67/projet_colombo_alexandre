import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client} from '../shared/models/client';


@Injectable({
    providedIn: 'root'
  })
export class ClientService {

  urlApiLogin: string = "/api/login";
  urlApiAuth: string = "/api/auth/";

  constructor(private http: HttpClient) { }

  // On obtient un JWT
  public postLogin(login: string, password: string) : Observable<Client>{
    let data: string = "login=" + login + "&password=" + password;
    let httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
    };
    return this.http.post<Client>(this.urlApiLogin, data, httpOptions);
  }

  public getLogin(login: string) : Observable<Client> {
    let data: string = "login=" + login;
    return this.http.get<Client>(this.urlApiAuth + login);
  }
}