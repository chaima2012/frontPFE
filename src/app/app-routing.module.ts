import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './resgiter/login/login.component';
import { AuthGuard } from './resgiter/login/AuthGuard';
import { RegisterComponent } from './register/register.component';
import { AddCallComponent } from './add-call/add-call.component';
import { AddCampanyComponent } from './add-campany/add-campany.component';
import { CampanyListComponent } from './campany-list/campany-list.component';
import { ViewBidsComponent } from './view-bids/view-bids.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { AddRequestComponent } from './add-request/add-request.component';
import { AddOffersComponent } from './add-offers/add-offers.component';
import { CampaniesOverviewComponent } from './campanies-overview/campanies-overview.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'home', loadChildren:()=> import('./home/home.module').then(mod => mod.HomeModule), data: {breadcrumb: 'Home'} },
  {path:'register', component: RegisterComponent},
  {path:'add-call', component: AddCallComponent},
  {path:'add-Campany', component: AddCampanyComponent},
  {path:'Campany-list', component: CampanyListComponent},
  {path:'view-bids', component: ViewBidsComponent},
  {path:'user-list', component: UserListComponent},
  {path:'user-overview', component: UserOverviewComponent},
  {path:'**', redirectTo:'not-found', pathMatch: 'full'},
  {path:"user-add", component: UserAddComponent},
  {path:"user-request", component:UserRequestComponent},
  {path:"add-request", component:AddRequestComponent},
  {path:"add-offers", component:AddOffersComponent},
  {path:"campanies-overview",component:CampaniesOverviewComponent},
  {path:"contact", component:ContactComponent}
  

];

@NgModule({
  imports: [  RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
