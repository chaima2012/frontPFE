import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLService {
  private apiUrl = 'http://localhost:5034/api/ListEmployees';

  constructor(private http: HttpClient) { }

  updateUser(userId: number, name: string, email: string): Observable<any> {
    const url = `http://localhost:5034/api/ListEmployees/editUpd/${userId}`;
    return this.http.put(url, { name, email });
}


updatePassword(userId: number, currentPassword: string, newPassword: string): Observable<any> {
  const url = `${this.apiUrl}/updatePassword/${userId}`;
  const body = { currentPassword, newPassword };
  return this.http.put(url, body);
}


  // Other methods...
}
