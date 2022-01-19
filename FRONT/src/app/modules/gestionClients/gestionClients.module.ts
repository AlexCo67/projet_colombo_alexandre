import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccueilClientComponent } from './accueil-client/accueil-client.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { FormulaireClientComponent } from './formulaire-client/formulaire-client.component';
import { NgxsModule } from '@ngxs/store';
import { ClientState } from 'src/app/shared/states/client-state';
import { ProduitState } from 'src/app/shared/states/produit-state';




const appChild: Routes = [

  {
    path: 'accueilClient',
    component: AccueilClientComponent,
  },
  {
    path: 'detailClient',
    component: DetailClientComponent,
  },
  {
    path: 'formulaireClient',
    component: FormulaireClientComponent,
  },





];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appChild),
    ReactiveFormsModule,
    NgxsModule.forRoot([ClientState]),
    //NgxsModule.forRoot([ProduitState]),
  ],

  declarations: [
    DetailClientComponent,
    FormulaireClientComponent,
  ],
})
export class GestionClientsModule {}