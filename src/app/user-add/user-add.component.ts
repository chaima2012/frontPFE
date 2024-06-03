import { Component, OnInit } from '@angular/core';
import { UserAddService } from './user-add.service'; // Corrected import path
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  employeeData: any = {
    // Initialize with default data or bind to form fields
  };

  constructor(
    private userAddService: UserAddService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.userAddService.getAllUsers().subscribe(
      data => {
        this.users = data;
        this.filteredUsers = this.users.filter(user => user.statusUserId === 1);
        console.log('Users with StatusUserId 1:', this.filteredUsers);
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  updateUserStatus(userId: number, status: boolean): void {
    const statusUserId = status ? 2 : 3;
    console.log(statusUserId);
    console.log(status);
    console.log(userId);
    this.userAddService.updateUserStatus(userId, statusUserId).subscribe(
      response => {
        console.log('User status updated successfully:', response);
        // Remove the user from the list
        this.filteredUsers = this.filteredUsers.filter(user => user.userId !== userId);
        console.log('Updated user list:', this.filteredUsers);
      },
      error => {
        console.error('Error updating user status:', error);
      }
    );
  }

  addEmployee() {
    this.employeeService.addEmployee(this.employeeData)
      .subscribe(
        response => {
          // Handle success response
          console.log('Employee added successfully:', response);
          // Optionally, reset form or perform other actions
        },
        error => {
          // Handle error response
          console.error('Error adding employee:', error);
        }
      );
  }
}
