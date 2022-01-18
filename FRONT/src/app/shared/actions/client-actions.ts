import { Client } from '../models/client';

export class AddClient {
  static readonly type = '[Client] Add';

  constructor(public payload: Client) {}
}


export class DelClient{
  static readonly type = '[Client] Del';

  constructor(public payload: Client) {}
}