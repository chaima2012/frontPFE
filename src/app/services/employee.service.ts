import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = ''; // Update with your actual backend base URL

  constructor(private http: HttpClient) { }

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Add`, employeeData);
  }
}
