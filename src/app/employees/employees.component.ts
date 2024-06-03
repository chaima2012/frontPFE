import { Component, OnInit } from '@angular/core';
import { UserOverviewService } from '../user-overview/user-overview.service';
import { UserListService } from '../user-list/user-list.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  requestData: any[] = [];
  filteredRequestData: any[] = [];
  formData: any = {}; // Object to store form data
  searchtext: any = '';
  users: any[] = [];
  cuser: any;
  email = localStorage.getItem("email");

  constructor(private reqservice: UserOverviewService, private userListService: UserListService) { }

  onSubmit() {
    // Assuming formData contains the form data
  }

  ngOnInit() {
    this.userListService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
      let found = this.users.find(user => user.email === this.email);
      console.log(found);
      if (found) {
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
    // Filter the requests to show only those with userId equal to cuser
    console.log(this.requestData); // Log the filtered requests
    console.log(this.cuser);
    this.filteredRequestData = this.requestData.filter(request => request.employeeId === this.cuser);

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

  toggleEdit(request: any) {
    request.editing = !request.editing;
    if (request.editing) {
      // Store original values for cancelation
      request.titleEdit = request.title;
      request.descriptionEdit = request.description;
      request.deadlineEdit = request.deadline;
    }
  }

  saveEdit(request: any) {
    const editedRequest = {
      requestId: request.requestId,
      title: request.titleEdit,
      description: request.descriptionEdit,
      deadline: request.deadlineEdit
    };

    this.reqservice.editRequest(request.requestId, editedRequest).subscribe(() => {
      // Update the requestData array or reload data
      this.reqservice.getReqswithIdOne().subscribe(dataOne => {
        this.reqservice.getReqswithIdTwo().subscribe(dataTwo => {
          this.requestData = [...dataOne, ...dataTwo];
          this.filterRequests(); // Filter requests after updating
        });
      });
    });
    request.editing = false; // Exit editing mode
  }
}
