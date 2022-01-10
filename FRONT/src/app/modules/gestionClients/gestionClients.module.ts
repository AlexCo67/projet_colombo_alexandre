import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccueilClientComponent } from './accueil-client/accueil-client.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { FormulaireClientComponent } from './formulaire-client/formulaire-client.component';



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
    path: 'formulaireCilent',
    component: FormulaireClientComponent,
  },





];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appChild),
    ReactiveFormsModule,
    //NgxsModule.forFeature([ProduitState]),
  ],

  declarations: [
    DetailClientComponent,
    FormulaireClientComponent
  ],
})
export class GestionClientsModule {}