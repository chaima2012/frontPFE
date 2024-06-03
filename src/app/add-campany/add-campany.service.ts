import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:5034/api/ListCompanies'; // Your backend API URL
  private updateStatusUrl = 'http://localhost:5034/api/ListCompanies/update-status'; // Corrected backend API URL for updating status
  private addCompanyUrl = 'http://localhost:5034/api/RegisterCompany'; // Your backend API URL for adding a company

  constructor(private http: HttpClient) { }

  getAllCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateCompanyStatus(userId: number, statusUserId: number): Observable<any> {
    return this.http.put<any>(`${this.updateStatusUrl}/${userId}`, { statusUserId });
  }

  deleteCompany(companyId: number): Observable<any> {
    const url = `${this.apiUrl}/${companyId}`;
    return this.http.delete(url);
  }

  addCompany(data: any): Observable<any> {
    return this.http.post<any>(this.addCompanyUrl, data);
  }
}
