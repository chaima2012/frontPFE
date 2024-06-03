import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampanyListService {
  private apiUrl = 'http://localhost:5034/api/ListCompanies'; // Your backend API URL

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteCompany(companyId: number): Observable<any> {
    const url = `${this.apiUrl}/${companyId}`;
    return this.http.delete(url);
  }

  updateCompanyStatus(userId: number, statusUserId: number): Observable<any> {
    console.log(userId);
    const url = `${this.apiUrl}/update-status/${userId}`;
    return this.http.put(url, { statusUserId });
  }

  updateCompany(userId: number, companyData: any): Observable<any> {
    const url = `${this.apiUrl}/update-company/${userId}`;
    return this.http.put(url, companyData);
  }

  uploadImage(file: File, userId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    return this.http.post<any>(this.apiUrl + '/upload', formData);
  }
}
