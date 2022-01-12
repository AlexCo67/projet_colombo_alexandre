import { Produit } from '../shared/models/produit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class serviceCatalogue {
  constructor(private httpClient: HttpClient) {}

  public produitCourant:Produit = {id:0, nom:"test", detailVisible:false, prix:0};

  public getProduit(): Produit {
    return this.produitCourant;
  }

  public setProduit(id:number, nom:string, visible:boolean){
      this.produitCourant.id=id;
      this.produitCourant.nom=nom;
      this.produitCourant.detailVisible=visible;
  }

  public getCatalogue(): Observable<Array<Produit>> {
    return this.httpClient.get<Array<Produit>>(environment.baseUrl);
  }
}