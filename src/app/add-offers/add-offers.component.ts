

import { MatDialog } from '@angular/material/dialog';
import { OfferformComponent } from './offerform/offerform.component';
  import { Component, OnInit, Inject } from '@angular/core';
  
  import { AddCallService } from '../add-call/add-call.service';
  @Component({
    selector: 'app-add-offers',
    templateUrl: './add-offers.component.html',
    styleUrls: ['./add-offers.component.scss']
  })
  export class AddOffersComponent implements OnInit {
    calls: any[] = [];
    showForm: boolean = false;
  
    constructor(private bidService: AddCallService,private matDialogg:MatDialog) { }
  
    ngOnInit(): void {
      this.loadCalls();
    }
    openDialogg(){
      this.matDialogg.open(OfferformComponent,{
        width:'700px',
        height: '500px',
      });
    }
    loadCalls(): void {
      this.bidService.getCalls().subscribe(
        (data: any[]) => {
          this.calls = data;
        },
        (error: any) => {
          console.error('Error fetching calls:', error);
        }
      );
    }
  }
  