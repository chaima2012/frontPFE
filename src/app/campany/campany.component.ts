import { Component, OnInit } from '@angular/core';
import { BidService } from '../view-bids/view-bids.service';
import { AddCallService } from '../add-call/add-call.service';

@Component({
  selector: 'app-campany',
  templateUrl: './campany.component.html',
  styleUrls: ['./campany.component.scss']
})
export class CampanyComponent implements OnInit {
  calls: any[] = [];
  Bids: any[] = [];
  filteredBids: any[] = [];
  searchtext: string = '';

  constructor(private bidService: AddCallService, private bidSer: BidService) { }

  ngOnInit(): void {
    this.loadCalls();
    this.loadBids();
  }

  loadCalls(): void {
    this.bidService.getCalls().subscribe(
      (data: any[]) => {
        console.log('Raw API Data calls:', data); // Log the raw data
        this.calls = data.filter(call => call.callId === 1);
        console.log('Filtered Calls:', this.calls);  // Log the filtered data
      },
      (error: any) => {
        console.error('Error fetching calls:', error);
      }
    );
  }

  loadBids(): void {
    this.bidSer.getBids().subscribe(
      (data: any[]) => {
        console.log('Raw API Data bids:', data); 
        this.Bids = data;
        this.filteredBids = data; // Initialize filteredBids with all bids
        console.log('Filtered bids:', this.calls); 
      },
      (error: any) => {
        console.error('Error fetching calls:', error);
      }
    );
  }

  filterBids(): void {
    const searchTextLower = this.searchtext.toLowerCase();
    this.filteredBids = this.Bids.filter(bid => {
      return Object.keys(bid).some(key => {
        if (bid[key] && typeof bid[key] === 'string') {
          return bid[key].toLowerCase().includes(searchTextLower);
        } else if (bid[key] && typeof bid[key] === 'number') {
          return bid[key].toString().includes(searchTextLower);
        }
        return false;
      });
    });
  }

  getStatus(statusUserId: number): string {
    if (statusUserId === 1) {
      return 'Pending';
    } else if (statusUserId === 2) {
      return 'Approved';
    } else {
      return 'Unknown'; // Or any other default value you want to handle
    }
  }
}
