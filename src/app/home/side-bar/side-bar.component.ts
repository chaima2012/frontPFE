import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserListService } from 'src/app/user-list/user-list.service';
import { LoginService } from 'src/app/resgiter/login/login.service';
import { CampanyListService } from 'src/app/campany-list/campany-list.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

 

  email = localStorage.getItem("email");

  searchtext: string = '';
    cuser:any

  users: any[] = [];
  companies: any[] = [];
  currentuser:any;
  constructor(private loginService:LoginService,private router:Router,private userListService:UserListService,private campanyListService:CampanyListService) { }

  ngOnInit(): void {
    this.userListService.getUsers().subscribe(data => {
      this.users=data;
      console.log(this.users);
      let found = this.users.find(user => user.email === this.email);
      console.log(found);
      if (found) {
        this.currentuser=found;
        console.log(this.currentuser)
        this.cuser = found.name;
        return;
      }    });
      this.campanyListService.getCompanies().subscribe(data => {
        this.companies=data;
        console.log(this.companies);
        console.log(this.email);
        let found = this.companies.find(user => user.email === this.email);
        console.log(found);
        if (found) {
          this.currentuser=found;
          console.log(this.currentuser);
          this.cuser = found.name;
          return;
        }   
    });
  }
  goTo(a:string){
    this.router.navigate(['home',a]);
  }
  ShowHideCollapse(a:string){
    var elt = document.getElementById(a) ;

      if (elt != null){
        if (elt.classList.contains("show")){
          elt.classList.remove('show')
        } 
          else {
            elt.classList.add('show') 
          }
          elt.classList.toggle('show')
        }

  }

}
