
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CoreModule } from '../core/core.module';
import { HomeRoutingModule } from './home-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from "ng-apexcharts";




@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    NgxPaginationModule,
    NgApexchartsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
