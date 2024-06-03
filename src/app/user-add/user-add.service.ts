import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAddService {
  private apiUrl = 'http://localhost:5034/api/ListEmployees'; // Your backend API URL
  private updateStatusUrl = 'http://localhost:5034/api/UpdateUserStatus'; // Your backend API URL for updating status

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateUserStatus(userId: number, statusUserId: number): Observable<any> {
    return this.http.put<any>(`${this.updateStatusUrl}/${userId}`, { statusUserId });
  }
}
