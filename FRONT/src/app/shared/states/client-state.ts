import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddClient, DelClient } from '../actions/client-actions';
import { ClientStateModel } from './client-state-model';
@State<ClientStateModel>({
  name: 'clients',
  defaults: {
    clients: [],
  },
})
@Injectable()
export class ClientState {
  @Selector()
  static getNbClients(state: ClientStateModel) {
    return state.clients.length;
  }
  @Selector()
  static getListeClients(state: ClientStateModel) {
    return state.clients;
  }


  @Action(AddClient)
  add(
    { getState, patchState }: StateContext<ClientStateModel>,
    { payload }: AddClient
  ) {
    const state = getState();
    patchState({
      clients: [...state.clients, payload],
    });
  }

  @Action(DelClient)
    del(
        { getState, patchState }: StateContext<ClientStateModel>, 
        { payload }: DelClient) {
        const state = getState();
        patchState({
            clients: [...state.clients.filter(id => id.login != payload.login)],
        });
    } 



}