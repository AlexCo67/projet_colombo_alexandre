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
  urlApiForm: string = "/api/form";
  urlApiHello:string="/api/hello/"

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

  public postForm(login:string, password:string, name:string, lastName:string, postalCode:string, town:string, email:string, phone:string, civil:string) : Observable<Client>{
    let data: string = "login=" + login + "&password=" + password + "&name="+name + "&lastName="+lastName+ "&postalCode="+postalCode+"&town="+town+"&email="+email+"&phone="+phone + "&civil="+civil;
    let httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
    };
    return this.http.post<Client>(this.urlApiForm, data, httpOptions);
  }

  public getHello(login:string){
    let data: string = "login=" + login;
    return this.http.get<Client>(this.urlApiHello + login);
  }

}