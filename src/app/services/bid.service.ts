import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private bidData = new BehaviorSubject<any[]>([]);
  currentBidData = this.bidData.asObservable();

  constructor() { }

  updateBidData(data: any[]) {
    this.bidData.next(data);
  }
}
