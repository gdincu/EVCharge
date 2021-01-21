import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBooking } from './models/booking';
import { IPagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {}

  chargingPoints: any[];

  ngOnInit(): void {
    this.http.get('https://localhost:44313/chargingpoints?pagesize=3').subscribe((response: IPagination) => {
      this.chargingPoints = response.data;
    }, error => {
        console.log(error);
    });
    } 

  title = 'EVCharge';
  
}
