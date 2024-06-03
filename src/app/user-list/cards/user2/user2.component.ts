import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
  styleUrls: ['./user2.component.scss']
})
export class User2Component implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    // You can use the data here if needed
  }
}
