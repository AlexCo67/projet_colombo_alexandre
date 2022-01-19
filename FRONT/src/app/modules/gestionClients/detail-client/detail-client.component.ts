import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/shared/models/client';
import { Store } from '@ngxs/store';
import { AddClient } from 'src/app/shared/actions/client-actions';
import { DelClient } from 'src/app/shared/actions/client-actions';
import { Select } from '@ngxs/store';
import { ClientState } from 'src/app/shared/states/client-state';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {

  formLogin!: FormGroup;
  client$!: Observable<Client>;
  c = new Client();

  constructor(private formBuilder: FormBuilder, private authentificationService: ClientService, private store: Store) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      login: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  @Select(ClientState.getListeClients)
  clients$!: Observable<Client[]>;

  submit(): void{
    console.log(this.formLogin.get("login")?.value);
    console.log(this.formLogin.get("password")?.value);

    // A MODIFIER
    const c = new Client();
    c.login=this.formLogin.get("login")?.value;
    c.password=this.formLogin.get("password")?.value;
    // A MODIFIER




    this.authentificationService.postLogin(this.formLogin.get("login")?.value, this.formLogin.get("password")?.value).subscribe(
      ()=>{
        this.client$ = this.authentificationService.getLogin(this.formLogin.get("login")?.value);
        this.store.dispatch(new AddClient(c));
      },
      (error)=>{
        alert("Erreur de connexion, login ou mot de passe inconnu");
        console.log("erreur" + error);
      }
    );
  }

  deco(c:Client):void{
      
      this.store.dispatch(new DelClient(c))
  }

}
