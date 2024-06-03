import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  calls: any[] = [];

  constructor() { }

  ngOnInit(): void { }

  sendMail(event: Event): void {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    const recipient = "stb@stb.com.tn";
    const subject = "Contact Us Form Submission";
    const body = "Please write your message here...";
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
