import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCallService {
  private apiUrl = 'http://localhost:5034/api/Calls'; // Your backend API URL

  constructor(private http: HttpClient) { }

  getCalls(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/List`);
  }

  addCall(callData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Create`, callData);
  }

  getBidsCount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/BidsCount`);
  }
  deleteBid(bidId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteBid/${bidId}`);
  }
  updateCall(callData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Update/${callData.callId}`, callData);
  }
  
}
