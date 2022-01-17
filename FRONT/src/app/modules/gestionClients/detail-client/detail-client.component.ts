import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/shared/models/client';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {

  formLogin!: FormGroup;
  client$!: Observable<Client>;

  constructor(private formBuilder: FormBuilder, private authentificationService: ClientService) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      login: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }


  submit(): void{
    console.log(this.formLogin.get("login")?.value);
    console.log(this.formLogin.get("password")?.value);

    this.authentificationService.postLogin(this.formLogin.get("login")?.value, this.formLogin.get("password")?.value).subscribe(
      ()=>{
        this.client$ = this.authentificationService.getLogin(this.formLogin.get("login")?.value);
      }
    );
  }

}
