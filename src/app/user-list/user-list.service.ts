import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private apiUrl = 'http://localhost:5034/api/ListEmployees'; // Your backend API URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }  
  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url);
  }
  updateEditedEmployee(employee: any): Observable<any> {
  
    const url = `${this.apiUrl}/edit/${employee.userId}`; // Update endpoint for updating edited employee
    return this.http.put(url, employee);
}
uploadProfileImage(formData: FormData, userId: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/UploadProfileImage/${userId}`, formData);
}
}

