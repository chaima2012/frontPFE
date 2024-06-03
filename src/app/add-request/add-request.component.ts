import { Component, OnInit } from '@angular/core';
import { UserOverviewService } from '../user-overview/user-overview.service';
import { UserListService } from '../user-list/user-list.service';
@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {
  requestData: any[] = [];
  formData: any = {}; // Object to store form data
  searchtext: any;

  constructor(private userListService:UserListService, private reqservice: UserOverviewService) { }
  email = localStorage.getItem("email");

    cuser:any

  users: any[] = [];
  companies: any[] = [];
  currentuser:any;

  onSubmit() { }

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
      this.reqservice.getReqswithIdOne().subscribe(data => {
        this.requestData = data;
        console.log(data);
      });
    });
    request.editing = false; // Exit editing mode
  }

  ngOnInit() {
    this.reqservice.getReqswithIdOne().subscribe(data => {
      this.requestData = data;
      console.log(data);

    });
    this.userListService.getUsers().subscribe(data => {
      this.users=data;
      console.log(data);
      let found = this.users.find(user => user.email === this.email);
      if (found) {
        this.currentuser=found.role;
        console.log(found);
        this.requestData = data.filter((req: { departmentName: any; }) => req.departmentName === this.currentuser);

        this.cuser = found.name;
        return;
      }    });
  }

  updateRequest(requestId: number) {
    this.reqservice.updateRequest(requestId).subscribe(response => {
      console.log('Request updated successfully:', response);
      // Optionally, you can update the UI here after successful update
    }, error => {
      console.error('Error updating request:', error);
    });
  }
}
