import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { ReportsComponent } from '../reports/reports.component';
import { AddCallComponent } from '../add-call/add-call.component';
import { UserListComponent } from '../user-list/user-list.component';
import { AddRequestComponent } from '../add-request/add-request.component';
import { UserRequestComponent } from '../user-request/user-request.component';
import { UserOverviewComponent } from '../user-overview/user-overview.component';
import { AddOffersComponent } from '../add-offers/add-offers.component';
import { CampanyListComponent } from '../campany-list/campany-list.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { CampanyComponent } from '../campany/campany.component';
import { AdminComponent } from '../admin/admin.component';
import { EmployeesComponent } from '../employees/employees.component';

const routes: Routes = [
  {path:'', component: HomeComponent ,
        children: [
            { path: '', component: DashboardComponent, data: { breadcrumb: 'Dashboard' }},
            { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' }},
            { path: 'reports', component: ReportsComponent, data: { breadcrumb: 'reports' }},
            { path: 'add-request', component: AddRequestComponent, data: { breadcrumb: 'Add-request' }},
           { path: 'user', loadChildren: () => import('./../user/user.module').then(mod => mod.UserModule), data: { breadcrumb: 'Profile' } },
           { path: 'add-call', component: AddCallComponent, data: { breadcrumb: 'Add-call' }},
           { path: 'user-list', component: UserListComponent, data: { breadcrumb: 'User-list' }},
           { path: 'user-request', component: UserRequestComponent, data: { breadcrumb: 'user-request' }},
           { path: 'user-overview', component: UserOverviewComponent, data: { breadcrumb: 'user-overview' }},
           { path: 'add-offers', component: AddOffersComponent, data: { breadcrumb: 'Add-offers' }},
           { path: 'Campany-list', component: CampanyListComponent, data: { breadcrumb: 'Campany-list' }},
           { path: 'contact', component:ContactComponent, data: { breadcrumb: 'Contact' }},
           { path: 'about', component: AboutComponent, data: { breadcrumb: 'About' }},
           { path: 'Campany', component: CampanyComponent, data: { breadcrumb: 'Campany' }},
           { path: 'admin', component: AdminComponent, data: { breadcrumb: 'admin' }},
           { path: 'employees', component: EmployeesComponent, data: { breadcrumb: 'Employees' }},





            { path: '**', redirectTo: '', pathMatch: 'full' },

        ],
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
