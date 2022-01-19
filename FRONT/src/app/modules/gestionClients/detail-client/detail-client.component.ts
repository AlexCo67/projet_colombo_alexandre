import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  userForm = new FormGroup({
    name:  new FormControl("",[Validators.required, Validators.pattern("[a-zA-Z]*")]),
    lastName:  new FormControl("",[Validators.required, Validators.pattern("[a-zA-Z]*")]),
    adress:  new FormControl("",[Validators.required, Validators.pattern("^[a-zA-Z0-9\\s,'-]*$")]),
    town:  new FormControl("",[Validators.required, Validators.pattern("[a-zA-Z]*")]),
    postalCode:  new FormControl("",[Validators.required, Validators.pattern("[0-9]{5}")]),
    phone:  new FormControl("",[Validators.required, Validators.pattern("[0-9]{10}")]),
    email:  new FormControl("",[Validators.required, Validators.email]),
    civility:  new FormControl("Monsieur"),
    login:  new FormControl("",[Validators.required, Validators.pattern("[0-9a-zA-Z]*")]),
    password:  new FormControl("",[Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{10,20}$")])});

    

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

  onFormSubmit(){

    console.log("Form invalide ? " + this.userForm.valid);
    
        if (this.userForm.invalid) {
          console.log("INVALID FORM");
          alert("Formulaire invalide, veuillez corriger les données");
          return;
      }
        console.log('Name:' + this.userForm.get('lastName')!.value);
        this.c.login=this.userForm.get('login')!.value;
        this.c.lastName=this.userForm.get('lastName')!.value;
        this.c.name=this.userForm.get('name')!.value;
        this.c.adress=this.userForm.get('adress')!.value;
        this.c.phone=this.userForm.get('phone')!.value;
        this.c.town=this.userForm.get('town')!.value;
        this.c.civil=this.userForm.get('civility')!.value;
        this.c.email=this.userForm.get('email')!.value;
        this.c.postalCode=this.userForm.get('postalCode')!.value;
        this.c.password=this.userForm.get('password')!.value;

console.log(this.c.login+" "+this.c.lastName+" "+this.c.name+" "+this.c.phone+" "+this.c.town+" "+this.c.civil+" "+this.c.email+" "+this.c.postalCode+" "+this.c.password);

        this.authentificationService.postUdpate(this.c.login,this.c.password,this.c.name,this.c.lastName,this.c.postalCode,this.c.town,this.c.email,this.c.phone,this.c.civil).subscribe(
            ()=>{this.client$ = this.authentificationService.getLogin(this.c.login);
        },
        (error)=>{
          alert("Erreur de push");
          console.log("erreur" + error);
        }

        );
  
    } 
  }

