import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ClientState } from './shared/states/client-state';

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

  {
    path: 'gestionClients',
    loadChildren: () =>
      import('./modules/gestionClients/gestionClients.module').then((m) => m.GestionClientsModule),
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
    NgxsModule.forRoot([ClientState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
