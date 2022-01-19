import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ClientState } from './shared/states/client-state';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LiensComponent } from './liens/liens.component';
import { ProduitState } from './shared/states/produit-state';
import { HttpInterceptorInterceptor } from './services/http-interceptor.interceptor';
import { RecherchePipe } from './modules/gestionProduits/catalogue/recherche.pipe';

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
    LiensComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
//    NgxsModule.forRoot([ClientState]),
//    NgxsModule.forRoot([ProduitState]),


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: HttpInterceptorInterceptor, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
