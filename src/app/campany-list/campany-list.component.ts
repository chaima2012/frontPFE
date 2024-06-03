import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCampanyComponent } from '../add-campany/add-campany.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { CampanyListService } from './campany-list.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-campany-list',
  templateUrl: './campany-list.component.html',
  styleUrls: ['./campany-list.component.scss'],
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
export class CampanyListComponent implements OnInit {
  searchtext: string = '';  // Initialize searchtext
  companies: any[] = [];
  filteredCompanies: any[] = [];
  editingCompany: any = null;

  constructor(
    private matDialog: MatDialog,
    private campanyListService: CampanyListService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.campanyListService.getCompanies().subscribe(data => {
      this.companies = data.filter((company: { statusUserId: number; }) => company.statusUserId === 2);
      this.filteredCompanies = this.companies;
      console.log(this.companies);
    });
  }

  filterCompanies(): void {
    const searchTerm = this.searchtext.toLowerCase();
    this.filteredCompanies = this.companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm) ||
      company.email.toLowerCase().includes(searchTerm) ||
      company.phoneNumber.toLowerCase().includes(searchTerm) ||
      company.address.toLowerCase().includes(searchTerm) ||
      company.userId.toString().includes(searchTerm)
    );
  }

  toggleEdit(company: any): void {
    if (this.editingCompany === company) {
      this.saveChanges(company); // Save changes when exiting editing mode
      this.editingCompany = null; // Exit editing mode
    } else {
      this.editingCompany = company; // Enter editing mode for this company
    }
  }

  saveChanges(company: any): void {
    console.log(company);
    this.campanyListService.updateCompany(company.userId, company).subscribe(
      response => {
        console.log('Company updated successfully:', response);
        this.editingCompany = null; // Exit editing mode after successful update
      },
      error => {
        console.error('Error updating company:', error);
      }
    );
  }

  updateStatus(userId: number, statusUserId: number): void {
    this.campanyListService.updateCompanyStatus(userId, statusUserId).subscribe(
      response => {
        console.log('Company status updated successfully:', response);
        // Remove the company from the list if status is not 2
        this.companies = this.companies.filter(company => company.userId !== userId || company.statusUserId === 2);
        this.filteredCompanies = this.filteredCompanies.filter(company => company.userId !== userId || company.statusUserId === 2);
        this.cdr.detectChanges();  // Manually trigger change detection
      },
      error => {
        console.error('Error updating company status:', error);
      }
    );
  }

  deleteCompany(companyId: number): void {
    this.campanyListService.deleteCompany(companyId).subscribe(
      response => {
        console.log('Company deleted successfully:', response);
        // Remove the company from the list
        this.companies = this.companies.filter(company => company.userId !== companyId);
        this.filteredCompanies = this.filteredCompanies.filter(company => company.userId !== companyId);
        this.cdr.detectChanges();  // Manually trigger change detection
      },
      error => {
        console.error('Error deleting company:', error);
      }
    );
  }

  OpenDialog() {
    this.matDialog.open(AddCampanyComponent, {
      width: '800px',
      height: '600px',
    });
  }

  openAddCompanyDialog() {
    this.OpenDialog();
  }

  isEditing(company: any): boolean {
    return this.editingCompany === company;
  }
}
