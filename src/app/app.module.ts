import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

import { AddCallComponent } from './add-call/add-call.component';
import { ViewBidsComponent } from './view-bids/view-bids.component';
import { LoginComponent } from './resgiter/login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReportsComponent } from './reports/reports.component';
import { RiskReportComponent } from './reports/risk-report/risk-report.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddCampanyComponent } from './add-campany/add-campany.component';
import { CampanyListComponent } from './campany-list/campany-list.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { AddRequestComponent } from './add-request/add-request.component';
import { User1Component } from './user-list/cards/user1/user1.component';
import { User2Component } from './user-list/cards/user2/user2.component';
import { User3Component } from './user-list/cards/user3/user3.component';
import { User4Component } from './user-list/cards/user4/user4.component';
import { User5Component } from './user-list/cards/user5/user5.component';
import { AddOffersComponent } from './add-offers/add-offers.component';
import { CampaniesOverviewComponent } from './campanies-overview/campanies-overview.component';
import { OfferformComponent } from './add-offers/offerform/offerform.component';
import { SuccessModalComponent } from './add-offers/offerform/success-modal/success-modal.component';
import { FilterPipe } from './filter.pipe';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeesComponent } from './employees/employees.component';
import { CampanyComponent } from './campany/campany.component';
import { RequestService } from './services/request.service';
import { UserComponent } from './user/user.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReportsComponent,
    RiskReportComponent,
    RegisterComponent,
    AddCallComponent,
    ViewBidsComponent,
    UserListComponent,
    AddCampanyComponent,
    CampanyListComponent,
    UserComponent,
    UserOverviewComponent,
    UserAddComponent,
    UserRequestComponent,
    AddRequestComponent,
    User1Component,
    User2Component,
    User3Component,
    User4Component,
    AddOffersComponent,
    User5Component,
    CampaniesOverviewComponent,
    OfferformComponent,
    SuccessModalComponent,
    FilterPipe,
    ContactComponent,
    AboutComponent,
    AdminComponent,
    EmployeesComponent,
    CampanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [RequestService],
  bootstrap: [AppComponent],
  entryComponents: [OfferformComponent], // Ensure entry component is declared

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
