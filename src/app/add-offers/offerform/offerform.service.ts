import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferformService {
    private apiUrl = 'http://localhost:5034/api/OfferForm';
  constructor(private http: HttpClient) { }

  uploadBid(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/uploadBid`, formData);
  }
}
