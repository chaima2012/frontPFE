import { Component, OnInit } from '@angular/core';
import { CompanyService } from './add-campany.service'; // Corrected import path

@Component({
  selector: 'app-add-campany',
  templateUrl: './add-campany.component.html',
  styleUrls: ['./add-campany.component.scss']
})
export class AddCampanyComponent implements OnInit {
  companies: any[] = [];
  filteredCompanies: any[] = [];
  companyData: any = {
    // Initialize with default data or bind to form fields
  };

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe(
      data => {
        this.companies = data;
        this.filteredCompanies = this.companies.filter(company => company.statusUserId === 1);
        console.log('Companies with StatusUserId 1:', this.filteredCompanies);
        console.log(this.companies);
      },
      error => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  updateCompanyStatus(userId: number, status: boolean): void {
    const statusUserId = status ? 2 : 3;
    console.log(`Updating company with userId: ${userId} to status: ${statusUserId}`); // Add a log statement
    this.companyService.updateCompanyStatus(userId, statusUserId).subscribe(
      response => {
        console.log('Company status updated successfully:', response);
        this.filteredCompanies = this.filteredCompanies.filter(company => company.userId !== userId);
        console.log('Updated company list:', this.filteredCompanies);
      },
      error => {
        console.error('Error updating company status:', error);
      }
    );
  }

  addCompany() {
    this.companyService.addCompany(this.companyData)
      .subscribe(
        response => {
          console.log('Company added successfully:', response);
        },
        error => {
          console.error('Error adding company:', error);
        }
      );
  }
}
