import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccueilProduitComponent } from './accueil-produit/accueil-produit.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { PanierComponent } from './panier/panier.component';
import { NgxsModule } from '@ngxs/store';
import { ClientState } from 'src/app/shared/states/client-state';
import { ProduitState } from 'src/app/shared/states/produit-state';

const appChild: Routes = [

  {
    path: 'accueilProduit',
    component: AccueilProduitComponent,
  },

  {
    path: 'panierProduit',
    component:PanierComponent,
  },
  {
    path: 'catalogueProduit',
    component:CatalogueComponent,
 
  }



];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appChild),
    ReactiveFormsModule,
//    NgxsModule.forRoot([ClientState]),
    NgxsModule.forRoot([ProduitState]),
  ],

  declarations: [
    PanierComponent,
    CatalogueComponent
  ],
})
export class GestionProduitsModule {}