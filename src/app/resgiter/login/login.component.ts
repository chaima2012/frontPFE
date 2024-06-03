import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  activeTab: string = 'signInTab'; // Initially set active tab to sign in

  toggleTab(tab: string) {
    this.activeTab = tab;
  }

  LoginForm: FormGroup;

  response:any 
  msgAlert:any=''
  loader:any=false
  res:any
  constructor(private fb: FormBuilder,private router:Router, private loginService : LoginService,private http:HttpClient) {
    this.createForm();
  
   }

  ngOnInit(): void {
    localStorage.removeItem("tiersClient")
    localStorage.setItem("ret","");
    localStorage.clear()
    this.f?.['login'].setValue("");
    this.f?.['pwd'].setValue("");

  }

  login()
  {
    this.loader=true
    localStorage.setItem("cuser",this.f?.['login'].value);
    localStorage.setItem("istrue","true");

this.Authenticate();


  }
  createForm() {
    this.LoginForm = this.fb.group({
      login: ['', Validators.required],
      pwd: ['', Validators.required]

    })
  }
  get f() { return this.LoginForm.controls; }

  Authenticate(){
    
    let login=(<HTMLInputElement>document.getElementById("login")).value;
    let password=(<HTMLInputElement>document.getElementById("password")).value;
   
    this.loginService.login(login,password)
    .subscribe(data => {
    this.response=data
    if(this.response){
      console.log(login);
      localStorage.setItem("login", login);
      localStorage.setItem("email", login);
      const retour = this.response.retour;
      this.loader=false
      if (retour==true){
        this.router.navigate(['home'], { queryParams: { email: login } });
      }
      }
    else{
      this.msgAlert = "Votre login ou mot de passe est incorrect.";
        document.getElementById("exampleModalLabelProcessedpop")?.setAttribute("style", "color:red;font-weight:bold")
        document.getElementById("btnalertPop")?.click()
        this.loader=false 
    }
 
    }, err => {
      this.loader=false
      if(err.indexOf('400')!=-1){
        this.msgAlert = "Votre login ou mot de passe est incorrect.";
        document.getElementById("exampleModalLabelProcessedpop")?.setAttribute("style", "color:red;font-weight:bold")
        document.getElementById("btnalertPop")?.click()
       }
      console.log(err);
      console.log('error API')


    });
  
    
  }




  
  FermerAlert() {
    document.getElementById("alertPop")?.setAttribute("class", "modal fade  hide")

  }

}
