import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserListService } from '../user-list/user-list.service';
import { UserLService } from './user.service';
import { CampanyListService } from '../campany-list/campany-list.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(
    private router: Router,
    private userser:UserLService,
    private CService:CampanyListService,
    private userService: UserListService,
    private http: HttpClient
  ) { }

  cuser: any;
  searchtext: string = '';
  users: any[] = [];
  companies: any[] = [];
  user: any = { name: '', email: '', userId: '' }; // Initialize user object
  email = localStorage.getItem("email");
  profileImagePath: string = 'assets/img/profile-img.jpg'; // Default profile image path

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      let found = this.users.find(user => user.email === this.email);
      if (found) {
        this.cuser = found.name;
        this.user = found;
      }
    });

    this.CService.getCompanies().subscribe(data => {
      this.companies = data;
      let found = this.companies.find(user => user.email === this.email);
      if (found) {
        this.cuser = found.name;
        this.user = found;
      }
    });
  }

  onSaveChanges(event: Event) {
    event.preventDefault();
    const fileInput = document.getElementById('profileImage') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const formData = new FormData();
      formData.append('file', fileInput.files[0]);
      formData.append('name', this.user.name);
      formData.append('email', this.user.email);

      this.userService.uploadProfileImage(formData, this.user.userId).subscribe(
        (response: any) => {
          console.log('Changes saved', this.user);
          this.profileImagePath = `http://localhost:5034/uploads/${response.fileName}`; // Update profile image path
        },
        (error) => {
          console.error('Error uploading file', error);
        }
      );
    } else {
      // Handle the case when no file is selected
      console.warn('No file selected for upload.');
    }
  }

  updateUser() {
    this.userser.updateUser(this.user.userId, this.user.name, this.user.email).subscribe(
      response => {
        console.log('User updated successfully', response);
      },
      error => {
        console.error('Error updating user', error);
      }
    );
  }

  updatePassword(currentPassword: string, newPassword: string, renewPassword: string) {
    if (newPassword !== renewPassword) {
        console.error('New passwords do not match');
        return;
    }

    this.userser.updatePassword(this.user.userId, currentPassword, newPassword).subscribe(
        response => {
            console.log('Password updated successfully', response);
        },
        error => {
            console.error('Error updating password', error);
        }
    );
}

  ShowHideMenu(): void {
    document.getElementsByTagName("body")[0].classList.toggle('toggle-sidebar');
  }

  goTo(a: string): void {
    this.router.navigate(['home', a]);
  }

  signOut(): void {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
