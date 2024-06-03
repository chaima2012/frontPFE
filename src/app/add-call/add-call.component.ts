import { Component, OnInit } from '@angular/core';
import { AddCallService } from './add-call.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewBidsComponent } from '../view-bids/view-bids.component';

@Component({
  selector: 'app-add-call',
  templateUrl: './add-call.component.html',
  styleUrls: ['./add-call.component.scss']
})
export class AddCallComponent implements OnInit {
  calls: any[] = [];
  showForm: boolean = false;
  editingCallId: number | null = null; // Track the ID of the call being edited

  constructor(private addCallService: AddCallService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCalls();
  }
  editCall(callId: number): void {
    this.editingCallId = callId === this.editingCallId ? null : callId; // Toggle editing mode
  }
  isEditing(callId: number): boolean {
    return callId === this.editingCallId;
  }
  deleteBid(callId: number): void {
    this.addCallService.deleteBid(callId).subscribe(response => {
        console.log('Bid deleted successfully:', response);
        this.loadCalls(); // Reload the calls to reflect the changes
    }, error => {
        console.error('Error deleting bid:', error);
    });
}

loadCalls(): void {
    this.addCallService.getCalls().subscribe((data: any[]) => {
        this.calls = data.map(call => {
            call.userStatus = this.getStatus(call.statusUserId);
            return call;
        });
        this.loadBidsCount(); // Load the count of bids for each call
        console.log(this.calls);
    }, error => {
        console.error('Error fetching calls:', error);
    });
}

loadBidsCount(): void {
    this.addCallService.getBidsCount().subscribe((data: any[]) => {
        this.calls.forEach(call => {
            const bidCount = data.filter(bid => bid.callId === call.callId).length;
            call.bidCount = bidCount;
        });
    }, error => {
        console.error('Error fetching bids count:', error);
    });
}


  openDialog() {
    this.matDialog.open(ViewBidsComponent, {
      width: '1500px', // Removed the space between '800' and 'px'
    });
  }
  getStatus(statusUserId: number): string {
    if (statusUserId === 1) {
      console.log("pending");
      return 'Pending';
    } else if (statusUserId === 2) {
      return 'Approved';
    } else {
      return 'Unknown'; // Or any other default value you want to handle
    }
  }
  
  toggleForm() {
    this.showForm = !this.showForm;
  }
  toggleEdit(call: any): void {
    call.editing = !call.editing; // Toggle the editing flag
  }
  updateCall(call: any): void {
    // Make API call to update the call in the database
    this.addCallService.updateCall(call).subscribe(response => {
      console.log('Call updated successfully:', response);
      call.editing = false; // Exit edit mode
      this.loadCalls(); // Reload the calls to reflect the changes
    }, error => {
      console.error('Error updating call:', error);
    });
  }
  onSubmit(description: string, rq: number, deadline: string, budget: number): void {
    const newCall = {
      description,
      requiredNumber: rq,
      deadline,
      budget,
      statusUserId: 1
    };

    this.addCallService.addCall(newCall).subscribe(response => {
      console.log('Call added successfully:', response);
      this.loadCalls(); // Reload the calls to reflect the new addition
    }, error => {
      console.error('Error adding call:', error);
    });
  }
}
