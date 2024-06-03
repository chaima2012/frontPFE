import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.scss']
})
export class User1Component implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // You can use the data here if needed
  }
}
