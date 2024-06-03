import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { AuthGuard } from '../resgiter/login/AuthGuard';
import { RiskReportComponent } from './risk-report/risk-report.component';


const routes: Routes = [
  { path: '', component: ReportsComponent },
  { path: 'riskreport', component: RiskReportComponent,  canActivate: [AuthGuard], data: { breadcrumb: { alias: 'riskreport' } } },
  
  { path: '**', redirectTo:'', pathMatch: 'full'},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
