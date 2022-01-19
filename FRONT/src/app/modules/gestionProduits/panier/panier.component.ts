import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { Produit } from 'src/app/shared/models/produit';
import { ProduitState } from 'src/app/shared/states/produit-state';
import { Store } from '@ngxs/store';
import { DelProduit } from 'src/app/shared/actions/produit-actions';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor(private store: Store) {}

  supprimerProduitPanier(c:Produit){
    console.log("produit supprimé" + c.nom);
    this.store.dispatch(new DelProduit(c));
  }


public payer() :void{
  this.store.reset(new ProduitState);
}


  ngOnInit(): void {
  }

  @Select(ProduitState.getListeProduits)
  liste$!: Observable<Produit[]>;
}
