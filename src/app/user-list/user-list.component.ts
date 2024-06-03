import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddComponent } from '../user-add/user-add.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserListService } from './user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class UserListComponent implements OnInit {
  searchtext: string = '';
  users1: any[] = [];
  users: any[] = [];
  filteredUsers: any[] = [];
  editingUser: any = null; // Variable to track the user being edited
  cuser: any;
  currentuser: any;
  email = localStorage.getItem("email");

  constructor(
    private matDialog: MatDialog,
    private userListService: UserListService
  ) { }

  ngOnInit(): void {
    this.userListService.getUsers().subscribe(data => {
      this.users1 = data;
      let found = this.users1.find(user => user.email === this.email);
      if (found) {
        this.currentuser = found.department;
        this.cuser = found.name;
        this.users = this.users1.filter(user => user.statusUserId === 2 && user.department === this.currentuser);
        this.filterUsers(); // Initialize filtered users
        console.log(this.users);
      }
    });
  }
  
  filterUsers(): void {
    const searchTerm = this.searchtext.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      (user.name.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm) ||
      user.department.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)) &&
      user.role !== 'SADMIN' // Exclude users with role 'SADMIN'
    );
  }

  toggleEdit(user: any): void {
    if (this.editingUser === user) {
      this.saveChanges(user); // Save changes when exiting editing mode
      this.editingUser = null; // Exit editing mode
    } else {
      this.editingUser = user; // Enter editing mode for this user
    }
  }

  saveChanges(user: any): void {
    // Convert role and department IDs back to names for backend processing
    console.log(user.userId);
    const updatedUser = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      statusUserId: user.statusUserId,
      role: user.role,
      department: user.department
    };
    
    console.log(updatedUser);
    this.userListService.updateEditedEmployee(updatedUser).subscribe(
      response => {
        console.log('User updated successfully:', response);
        this.editingUser = null; // Exit editing mode after successful update
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }

  isEditing(user: any): boolean {
    return this.editingUser === user;
  }

  deleteUser(userId: number): void {
    this.userListService.deleteUser(userId).subscribe(
      response => {
        console.log('User deleted successfully:', response);
        // Remove the user from the list
        this.users = this.users.filter(user => user.userId !== userId);
        this.filteredUsers = this.filteredUsers.filter(user => user.userId !== userId);
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }

  openAddUserDialog() {
    this.matDialog.open(UserAddComponent, {
      width: '800px',
      height: '600px',
    });
  }
}
