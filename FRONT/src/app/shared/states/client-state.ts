import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddClient } from '../actions/client-actions';
import { ClientStateModel } from './client-state-model';
@State<ClientStateModel>({
  name: 'adresses',
  defaults: {
    adresses: [],
  },
})
@Injectable()
export class ClientState {
  @Selector()
  static getNbClients(state: ClientStateModel) {
    return state.adresses.length;
  }
  @Selector()
  static getListeClients(state: ClientStateModel) {
    return state.adresses;
  }


  @Action(AddClient)
  add(
    { getState, patchState }: StateContext<ClientStateModel>,
    { payload }: AddClient
  ) {
    const state = getState();
    patchState({
      adresses: [...state.adresses, payload],
    });
  }
}