import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    NavBarComponent,
    SectionHeaderComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule

  ],
  exports:[ NavBarComponent,
    SectionHeaderComponent,
    SpinnerComponent]
})
export class CoreModule { }
