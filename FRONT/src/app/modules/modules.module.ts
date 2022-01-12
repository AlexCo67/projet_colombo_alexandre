import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccueilClientComponent } from './gestionClients/accueil-client/accueil-client.component';
import { AccueilProduitComponent } from './gestionProduits/accueil-produit/accueil-produit.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NgxsModule } from '@ngxs/store';
import { ClientState } from '../shared/states/client-state';
import { ProduitState } from '../shared/states/produit-state';


const appChild: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent,
  },

  {
    path: 'accueilClient',
    component: AccueilClientComponent,
  },

  {
    path: 'accueilProduit',
    component: AccueilProduitComponent,
  }



];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appChild),
    ReactiveFormsModule,
//    NgxsModule.forRoot([ClientState]),
//    NgxsModule.forRoot([ProduitState]),
  ],

  declarations: [
    AccueilClientComponent,
    AccueilProduitComponent,
  ],
})
export class ModulesModule {}
