import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCallService } from 'src/app/add-call/add-call.service';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { UserListService } from 'src/app/user-list/user-list.service';
import { CampanyListService } from 'src/app/campany-list/campany-list.service';
import { OfferformService } from './offerform.service';

@Component({
  selector: 'app-offerform',
  templateUrl: './offerform.component.html',
  styleUrls: ['./offerform.component.scss']
})
export class OfferformComponent implements OnInit {
  calls: any[] = [];
  formData: any = { 
    bidId: '', 
    description: '', 
    companyId: '', 
    companyName: '', 
    companyOffice: '', 
    submittedBy: '', 
    dateSubmitted: '', 
    docName: '', 
    budget: '' // Add budget to formData
  }; 
  selectedCall: any = {};
  currentDate = new Date().toISOString().split('T')[0];
  companies: any[] = [];
  email = localStorage.getItem("email");
  selectedFile: File | null = null;

  constructor(
    private bidService: AddCallService, 
    private matDialog: MatDialog,
    private userListService: UserListService,
    private offerformService: OfferformService,
    private campanyListService: CampanyListService
  ) { }

  ngOnInit(): void {
    this.loadCalls();
    this.campanyListService.getCompanies().subscribe(data => {
      this.companies = data;
      let found = this.companies.find(user => user.email === this.email);
      if (found) {
        this.formData.companyId = found.userId;
        this.formData.companyName = found.name;
        this.formData.companyOffice = found.address;
        this.formData.submittedBy = found.email;
        this.formData.dateSubmitted = this.currentDate; // Set the dateSubmitted here
      }
    });
  }

  loadCalls(): void {
    this.bidService.getCalls().subscribe(
      (data: any[]) => { this.calls = data; },
      (error: any) => { console.error('Error fetching calls:', error); }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.formData.docName = file.name;
    }
  }

  onCallChange(callId: number): void {
    this.selectedCall = this.calls.find(call => call.callId == callId) || {};
    this.formData.bidId = callId; // Set the bidId here
    this.updateFormData();
  }

  updateFormData(): void {
    this.formData.description = this.selectedCall.description || '';
    this.formData.budget = String(this.selectedCall.budget) || ''; // Ensure budget is set
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('BidId', this.formData.bidId); // BidId expected by backend
    formData.append('Idcall', this.formData.bidId); // Idcall expected by backend
    formData.append('CompanyId', this.formData.companyId); // CompanyId expected by backend
    formData.append('DocumentName', this.formData.docName); // DocumentName expected by backend
    formData.append('AmountTTC', this.formData.budget); // AmountTTC expected by backend

    if (this.selectedFile) {
      formData.append('file', this.selectedFile); // file expected by backend
    }

    // Debugging step: log the formData object
    console.log(this.formData);

    this.offerformService.uploadBid(formData).subscribe(
      (response: any) => {
        console.log('Bid uploaded successfully:', response);
        this.showSuccessAlert();
      },
      (error: any) => {
        console.error('Error uploading bid:', error);
      }
    );
  }

  showSuccessAlert() {
    this.matDialog.open(SuccessModalComponent, { width: '500px' });
  }
}
