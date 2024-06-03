import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private requestData = new BehaviorSubject<any[]>([]);
  currentData = this.requestData.asObservable();

  constructor() { }

  updateData(data: any[]) {
    this.requestData.next(data);
  }
}
