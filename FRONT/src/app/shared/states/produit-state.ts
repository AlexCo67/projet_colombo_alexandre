import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddProduit } from '../actions/produit-actions';
import { DelProduit } from '../actions/produit-actions';
import { ProduitStateModel } from './produit-state-model';
@State<ProduitStateModel>({
  name: 'produits',
  defaults: {
    produits: [],
  },
})
@Injectable()
export class ProduitState {
  @Selector()
  static getNbProduits(state: ProduitStateModel) {
    return state.produits.length;
  }
  @Selector()
  static getListeProduits(state: ProduitStateModel) {
    return state.produits;
  }

  @Action(DelProduit)
    del(
        { getState, patchState }: StateContext<ProduitStateModel>, 
        { payload }: DelProduit) {
        const state = getState();
        patchState({
            produits: [...state.produits.filter(id => id.id != payload.id)],
        });
    } 

  @Action(AddProduit)
  add(
    { getState, patchState }: StateContext<ProduitStateModel>,
    { payload }: AddProduit
  ) {
    const state = getState();
    patchState({
      produits: [...state.produits, payload],
    });
  }
}
