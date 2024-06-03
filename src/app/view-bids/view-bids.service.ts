import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private apiUrl = 'http://localhost:5034/api/Calls'; // Your backend API URL
  private downloadUrl = 'http://localhost:5034/api/Calls/DownloadDocument'; // Your backend API URL
  private bidDataSubject = new BehaviorSubject<any[]>([]);
  currentBidData = this.bidDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCalls(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/List`);
  }

  getBids(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ListBids`);
  }

  fetchCallsWithStatus1(): void {
    this.getCalls().subscribe((data: any[]) => {
      const filteredCalls = data.filter(call => call.StatusId === 1);
      this.bidDataSubject.next(filteredCalls);
    }, error => {
      console.error('Error fetching calls:', error);
    });
  }

  downloadDocument(documentName: string): Observable<Blob> {
    const encodedFileName = encodeURIComponent(documentName);
    return this.http.get(`${this.downloadUrl}?fileName=${encodedFileName}`, { responseType: 'blob' });
  }

  updateBidStatus(callId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateStatus/${callId}`, { StatusId: 2 });
  }
}
