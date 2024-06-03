import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  activeTab: string = 'signInTab';
  registerForm: FormGroup;
  CampanyRegisterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      position: ['Employee', Validators.required],
      department: ['', Validators.required]
    });

    this.CampanyRegisterForm = this.fb.group({
      CompanyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  toggleTab(tab: string) {
    this.activeTab = tab;
  }

  registerEmployee() {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Employee registration successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Employee registration failed', error);
        }
      );
    }
  }

  registerCampany() {
    if (this.CampanyRegisterForm.valid) {
      this.registerService.registerCampany(this.CampanyRegisterForm.value).subscribe(
        response => {
          console.log('Campany registration successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Campany registration failed', error);
        }
      );
    }
  }
}
