import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserListService } from 'src/app/user-list/user-list.service';
import { CampanyListService } from 'src/app/campany-list/campany-list.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  constructor(private router : Router,    private userListService: UserListService   , private campanyListService: CampanyListService) { }
  email = localStorage.getItem("email");

  searchtext: string = '';
    cuser:any

  users: any[] = [];
  companies: any[] = [];
  currentuser:any;

  ngOnInit(): void {
    this.userListService.getUsers().subscribe(data => {
      this.users=data;
      console.log(this.users);
      let found = this.users.find(user => user.email === this.email);
      console.log(found);
      if (found) {
        this.currentuser=found.role;
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
          console.log("company found");
          this.cuser = found.name;
          return;
        }   
    });
  }


  isEmployeeOrManager(role:string): number{
    if(role=="Admin"){
      return 1;
    }
    if (role=="Manager" || role=="Employee"){
      return 2;
    }
    if (role=="SADMIN"){
      return 3
    }
    return 0;
  }

  ShowHideMenu(){
    document.getElementsByTagName("body")[0].classList.toggle('toggle-sidebar');
  }

  goTo(a:string){
    this.router.navigate(['home',a]);
  }
  
  
  signOut(){
    localStorage.clear()
    this.router.navigateByUrl("/login");

  }
  

}
