import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOverviewService {

  private apiUrl = 'http://localhost:5034/api/ListEmployees'; // Your backend API URL

  constructor(private http: HttpClient) { }

  getReqswithIdOne(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/ListReq/1`); // Send value 1 to the backend
  }

  editRequest(requestId: number, request: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/EditRequest/${requestId}`, request);
  }
  
  getReqswithIdTwo(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/ListReq/2`); // Send value 2 to the backend
  }

  deleteCompany(companyId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${companyId}`);
  }

  addReq(callData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AddReq`, callData);
  }
  
  updateRequest(requestId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateRequest/${requestId}`, {});
  }
}
