import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserOverviewService } from '../user-overview/user-overview.service';
@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent implements OnInit {
  requestData:any[]=[];
  searchtext:any;
  constructor(private reqservice:UserOverviewService) { }
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
      this.reqservice.getReqswithIdTwo().subscribe(data => {
        this.requestData = data;
        console.log(data);
      });
    });
    request.editing = false; // Exit editing mode
  }
  
  ngOnInit() {
    this.reqservice.getReqswithIdTwo().subscribe(data => {
      this.requestData = data;
      console.log(data);
    });
  }

}
