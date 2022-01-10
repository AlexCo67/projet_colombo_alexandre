import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccueilProduitComponent } from './accueil-produit/accueil-produit.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { PanierComponent } from './panier/panier.component';

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
    //NgxsModule.forFeature([ProduitState]),
  ],

  declarations: [
    PanierComponent,
    CatalogueComponent
  ],
})
export class GestionProduitsModule {}