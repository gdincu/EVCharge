import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../shared/services/alertify.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private _alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createContactForm();
  }
    createContactForm() {
      this.contactForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators
          .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
        lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
        about: new FormControl('', [Validators.required, Validators.minLength(3)]),
        message: new FormControl('', [Validators.required, Validators.minLength(3)])
      });
  }

  onSubmit() {
    this._alertify.success('Thanks for your feedback! Your review/ question will be reviewed by a member of our support team as soon as possible!');
    this.router.navigateByUrl('/', { skipLocationChange: true });
  }

}
