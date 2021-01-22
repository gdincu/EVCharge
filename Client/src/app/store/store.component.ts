import { Component, OnInit } from '@angular/core';
import { IBooking } from '../shared/models/booking';
import { StoreService } from './store.service';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  bookings: IBooking[];

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    this.storeService.getBookings().subscribe(response => {
      this.bookings = response.data;
    }, error => {
      console.log(error);
    });
  }

  //////////////////////////////////////////////

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [{
    type: 'stepper',
    fieldGroup: [
      {
        templateOptions: { label: 'Personal data' },
        fieldGroup: [
          {
            key: 'firstname',
            type: 'input',
            templateOptions: {
              label: 'First name',
              required: true,
            },
          },
          {
            key: 'age',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: 'Age',
              required: true,
            },
          },
        ],
      },
      {
        templateOptions: { label: 'Destination' },
        fieldGroup: [
          {
            key: 'country',
            type: 'input',
            templateOptions: {
              label: 'Country',
              required: true,
            },
          },
        ],
      },
      {
        templateOptions: { label: 'Day of the trip' },
        fieldGroup: [
          {
            key: 'day',
            type: 'input',
            templateOptions: {
              type: 'date',
              label: 'Day of the trip',
              required: true,
            },
          },
        ],
      },
    ],
  }];

  submit() {
    alert(JSON.stringify(this.model));
  }

}
