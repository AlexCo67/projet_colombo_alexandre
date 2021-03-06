import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,Output, EventEmitter  } from '@angular/core';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { AddClient } from 'src/app/shared/actions/client-actions';
import { Client } from 'src/app/shared/models/client';

@Component({
  selector: 'app-formulaire-client',
  templateUrl: './formulaire-client.component.html',
  styleUrls: ['./formulaire-client.component.css']
})
export class FormulaireClientComponent implements OnInit {
  client$!: Observable<Client>;
  public client:Client = new Client();

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


  constructor(private formBuilder: FormBuilder, private store: Store, private authentificationService: ClientService, private http: HttpClient) { }

  onFormSubmit(): void {
    console.log("Form invalide ? " + this.userForm.valid);
    
        if (this.userForm.invalid) {
          console.log("INVALID FORM");
          alert("Formulaire invalide, veuillez corriger les donn??es");
          return;
      }
        console.log('Name:' + this.userForm.get('lastName')!.value);
    
        this.client.lastName=this.userForm.get('lastName')!.value;
        this.client.name=this.userForm.get('name')!.value;
        this.client.adress=this.userForm.get('adress')!.value;
        this.client.phone=this.userForm.get('phone')!.value;
        this.client.town=this.userForm.get('town')!.value;
        this.client.civil=this.userForm.get('civility')!.value;
        this.client.email=this.userForm.get('email')!.value;
        this.client.postalCode=this.userForm.get('postalCode')!.value;
        this.client.login=this.userForm.get('login')!.value;
        this.client.password=this.userForm.get('password')!.value;
    
        console.log('CLIENT : '+ this.client.lastName);
    
        this.addClient(this.client);
    
    } 

    addClient(clientToAdd:Client) {

  
      console.log(clientToAdd);
      console.log(clientToAdd.login+' '+clientToAdd.password+' '+clientToAdd.name+' '+clientToAdd.lastName+' '+clientToAdd.postalCode.toString()+' '+clientToAdd.town+' '+clientToAdd.email+' '+clientToAdd.phone.toString()+' '+clientToAdd.civil);
      this.authentificationService.postForm(clientToAdd.login, clientToAdd.password, clientToAdd.name, clientToAdd.lastName, clientToAdd.postalCode, clientToAdd.town, clientToAdd.email, clientToAdd.phone, clientToAdd.civil).subscribe();
      console.log("ok c'est push");
      alert("Client cr????");
    }

  ngOnInit(): void {
  }




}
