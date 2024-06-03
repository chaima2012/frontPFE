import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddCallService } from '../add-call/add-call.service';
import { BidService } from './view-bids.service';

@Component({
  selector: 'app-view-bids',
  templateUrl: './view-bids.component.html',
  styleUrls: ['./view-bids.component.scss']
})
export class ViewBidsComponent implements OnInit {
  calls: any[] = [];
  Bids: any[] = [];
  filteredBids: any[] = [];
  searchText: string = '';

  constructor(private bidService: AddCallService, private bidSer: BidService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCalls();
    this.loadBids();
  }

  loadCalls(): void {
    this.bidService.getCalls().subscribe(
      (data: any[]) => {
        console.log('Raw API Data:', data); // Log the raw data
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
        console.log('Raw API Data:', data);
        this.Bids = data.filter(bid => bid.statusUserId !== 2); // Filter out bids with statusUserId = 2
        this.filteredBids = this.Bids; // Initially display all filtered bids
        console.log('Filtered Bids:', this.filteredBids);
      },
      (error: any) => {
        console.error('Error fetching bids:', error);
      }
    );
  }

  filterBids(): void {
    const searchTerm = this.searchText.trim().toLowerCase();
    if (searchTerm === '') {
      this.filteredBids = this.Bids;
    } else {
      this.filteredBids = this.Bids.filter(bid => 
        bid.description.toLowerCase().includes(searchTerm)
      );
    }
  }

  deleteBid(bid: any): void {
    this.bidSer.updateBidStatus(bid.callId).subscribe(
      response => {
        console.log('Bid status updated successfully:', response);
        // Update the status locally
        bid.statusUserId = 2;
        this.Bids = this.Bids.filter(b => b.callId !== bid.callId); // Remove the updated bid from the Bids list
        this.filterBids(); // Update the filtered list
      },
      error => {
        console.error('Error updating bid status:', error);
      }
    );
  }

  downloadDocument(documentName: string): void {
    this.bidSer.downloadDocument(documentName).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = documentName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
        console.error('Error downloading document:', error);
      }
    );
  }
}
