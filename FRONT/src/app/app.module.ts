import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
//import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { LiensComponent } from './liens/liens.component';

const appRoutes: Routes = [
  {
    path: 'modules',
    loadChildren: () =>
      import('./modules/modules.module').then((m) => m.ModulesModule),
  },

  {
    path: 'gestionProduits',
    loadChildren: () =>
      import('./modules/gestionProduits/gestionProduits.module').then((m) => m.GestionProduitsModule),
  },


];


@NgModule({
  declarations: [
    AppComponent,
    LiensComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
