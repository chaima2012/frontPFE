import { Component, OnInit } from '@angular/core';
import { UserOverviewService } from '../user-overview/user-overview.service';
import { UserListService } from '../user-list/user-list.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  requestData: any[] = [];
  filteredRequestData: any[] = [];
  formData: any = {}; // Object to store form data
  searchtext: any = '';
  users: any[] = [];
  cuser: any;
  email = localStorage.getItem("email");
  currentrole: any;

  constructor(private reqservice: UserOverviewService, private userListService: UserListService) { }

  onSubmit() {
    // Assuming formData contains the form data
  }

  ngOnInit() {
    this.userListService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
      let found = this.users.find(user => user.email === this.email);
      if (found) {
        this.currentrole = found;
        this.cuser = found.userId;
        this.loadRequests(); // Load requests after setting cuser
      }
    });
  }

  loadRequests() {
    // Call both APIs and merge the results
    this.reqservice.getReqswithIdOne().subscribe(dataOne => {
      this.reqservice.getReqswithIdTwo().subscribe(dataTwo => {
        this.requestData = [...dataOne, ...dataTwo];
        this.filterRequests(); // Filter requests after merging
      });
    });
  }

  filterRequests() {
    // Filter requests based on role, department, and search text
    const role = this.currentrole.role;
    const department = this.currentrole.department;

    this.filteredRequestData = this.requestData.filter(request =>
     request.departmentName === department
    );

    // Further filter based on search text
    if (this.searchtext) {
      const searchTextLower = this.searchtext.toLowerCase();
      this.filteredRequestData = this.filteredRequestData.filter(request =>
        request.title.toLowerCase().includes(searchTextLower) ||
        request.description.toLowerCase().includes(searchTextLower) ||
        request.deadline.toLowerCase().includes(searchTextLower)
      );
    }

    console.log(this.filteredRequestData); // Log the filtered requests
  }
}
