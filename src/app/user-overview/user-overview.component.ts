import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { NavBarComponent } from '../core/nav-bar/nav-bar.component';
import { UserListService } from '../user-list/user-list.service';
import { CampanyListService } from '../campany-list/campany-list.service';
import { UserOverviewService } from './user-overview.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit, AfterViewInit {
  formData: any = {}; // Assuming this holds the form data
  currentStep: number = 1; // Variable to track the current step of the form
  @ViewChild(NavBarComponent) navBarComponent!: NavBarComponent; // Reference to NavBarComponent
  
  constructor(
    private dataService: DataService,
    private userListService: UserListService,
    private reqService: UserOverviewService,
    private campanyListService: CampanyListService
  ) { }

  found: any;
  users: any[] = [];
  companies: any[] = [];
  userId: any;
  email = localStorage.getItem("email");

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  ngOnInit(): void {
    this.userListService.getUsers().subscribe(data => {
      this.users = data;
      this.found = this.users.find(user => user.email === this.email);
      if (this.found) {
        this.formData.fname = this.found.name;
        this.formData.lname = this.email;
        this.formData.position = this.found.role; // Assign role to position
        this.formData.department = this.found.department;
        this.userId = this.found.userId; // Set userId from the found user
      }
    });

    this.campanyListService.getCompanies().subscribe(data => {
      this.companies = data;
      const foundCompany = this.companies.find(company => company.email === this.email);
      if (foundCompany) {
        this.found = foundCompany;
        this.userId = foundCompany.userId; // Set userId from the found company
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(this.Function11.bind(this), 500);
  }

  Function11() {
    this.email = this.email !== null ? this.email : "";
    this.email = localStorage.getItem("email") ?? "";
    
    const emailElement = <HTMLInputElement>document.getElementById("email");
    if (emailElement) {
      emailElement.value = this.email;
    }
  }

  onSubmit(title: string, description: string, deadline: string): void {
    if (this.userId) {
        const newReq = {
            title,
            description,
            userId: this.userId, // Correct field name to match backend DTO
            deadline,
            statusId: 1,
            decisionId: 3
        };

        console.log('Submitting request:', newReq); // Log the data being sent

        this.reqService.addReq(newReq).subscribe(response => {
            console.log('Call added successfully:', response);
        }, error => {
            console.error('Error adding call:', error); // Log the error response
        });
    } else {
        console.error('UserId is not defined.');
    }
}
}