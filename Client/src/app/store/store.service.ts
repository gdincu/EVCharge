import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IChargingPoint } from '../shared/models/chargingPoint';
import { IChargingPointLocation } from '../shared/models/chargingPointLocation';
import { IChargingPointType } from '../shared/models/chargingPointType';
import { StoreParams } from '../shared/models/storeParams';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookingService } from '../booking/booking.service';
import { IBooking, IBookingToCreate } from '../shared/models/booking';

//Decorated with the Injectable decorator
@Injectable({
  //So that it is provided in the app module and initialised when the app starts
  providedIn: 'root'
})
export class StoreService {
  baseUrl = 'https://localhost:5001/';
  chargingPoints: IChargingPoint[] = [];
  chargingPointLocations: IChargingPointLocation[] = [];
  chargingPointTypes: IChargingPointType[] = [];
  pagination = new Pagination();
  storeParams = new StoreParams();
  availableFlag: boolean;
  //availableFlag: boolean = true;

  constructor(
    private http: HttpClient,
    private bookingService: BookingService
  ) { }

  getChargingPoints(useCache: boolean) {
    if (useCache === false) {
      this.chargingPoints = [];
    }

    if (this.chargingPoints.length > 0 && useCache === true) {
      const pagesReceived = Math.ceil(this.chargingPoints.length / this.storeParams.pageSize);

      if (this.storeParams.pageNumber <= pagesReceived) {
        this.pagination.data =
          this.chargingPoints.slice((this.storeParams.pageNumber - 1) * this.storeParams.pageSize,
            this.storeParams.pageNumber * this.storeParams.pageSize);

        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.storeParams.ChargingPointLocationId !== 0) {
      params = params.append('LocationId', this.storeParams.ChargingPointLocationId.toString());
    }

    if (this.storeParams.ChargingPointTypeId !== 0) {
      params = params.append('TypeId', this.storeParams.ChargingPointTypeId.toString());
    }

    if (this.storeParams.search) {
      params = params.append('search', this.storeParams.search);
    }

    params = params.append('sort', this.storeParams.sort);
    params = params.append('pageIndex', this.storeParams.pageNumber.toString());
    params = params.append('pageSize', this.storeParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'chargingpoints', { observe: 'response', params })
      .pipe(
        map(response => {
          this.chargingPoints = [...this.chargingPoints, ...response.body.data];
          this.pagination = response.body;
          return this.pagination;
        })
      );
  }

  getChargingPoint(id: number) {
    const chargingPoint = this.chargingPoints.find(p => p.id === id);

    if (chargingPoint) {
      return of(chargingPoint);
    }

    return this.http.get<IChargingPoint>(this.baseUrl + 'chargingpoints/' + id);
  }

  getStoreParams() {
    return this.storeParams;
  }

  setStoreParams(params: StoreParams) {
    this.storeParams = params;
  }

  getChargingPointTypes() {
    if (this.chargingPointTypes.length > 0) {
      return of(this.chargingPointTypes);
    }
    return this.http.get<IChargingPointType[]>(this.baseUrl + 'chargingpoints/chargingpointtypes').pipe(
      map(response => {
        this.chargingPointTypes = response;
        return response;
      })
    );
  }

  getChargingPointLocations() {
    if (this.chargingPointLocations.length > 0) {
      return of(this.chargingPointLocations);
    }
    return this.http.get<IChargingPointLocation[]>(this.baseUrl + 'chargingpoints/chargingpointlocations').pipe(
      map(response => {
        this.chargingPointLocations = response;
        return response;
      })
    );
  }

  //checkAvailability
  checkAvailability(chargingPointId: number, start: Date, end: Date) {

    let tempData: IBooking[] = []; 

    this.bookingService.getBookings(true).subscribe(x => {
      tempData = x.data.filter(y => y.chargingPointId == chargingPointId);
    });

    console.log(tempData);

      //When there are no bookings made for the chargingPointId provided
      if (tempData.length == 0) {
        this.availableFlag = true;
        console.log('checkAvailability: No bookings made for this chargingPointId');
        return true;
      }

      //When there are bookings made for the chargingPointId provided with a start date <= start and start >= enddate <= end
      tempData.forEach(item => {
        if ((start.toString() >= item.start && start.toString() <= item.end) ||
          (end.toString() >= item.start && end.toString() <= item.end) ||
          (item.start >= start.toString() && item.start >= end.toString())) {
          this.availableFlag = false;
          return false;
        }
        else {
          this.availableFlag = true;
          return true;
        }
      });

    }

  createBooking(chargingPointId: number, start: Date, end: Date) {
    this.checkAvailability(chargingPointId, start, end);
    let tempPrice = 0;
    this.getChargingPoint(chargingPointId).subscribe(x => tempPrice = x.price);
    var arr: IBooking[] = [];
    this.bookingService.getBookings(false).subscribe(x => arr = x.data);
    var tempId = arr.reduce((bestIndexSoFar, currentlyTestedValue, currentlyTestedIndex, array) => currentlyTestedValue > array[bestIndexSoFar] ? currentlyTestedIndex : bestIndexSoFar, 0);

    var tempBooking: IBookingToCreate = {
      id: tempId,
      UserId: this.bookingService.currentUserId,
      ChargingPointId: chargingPointId,
      Start: start.toString(),
      End: end.toString(),
      Price: tempPrice,
      CreatedTimestamp: new Date().toISOString().slice(0, 16)
    }

    console.log('storeService.createBooking: Booking:');
    console.log(tempBooking);
    

    //if (this.adminService.createChargingPointType(temp2).subscribe())

    console.log('createBooking availableFlag: ' + this.availableFlag);

    return this.http.post(this.baseUrl + 'Bookings', tempBooking);
  }
   
  isEarlierOrEqual(dateString1, dateString2) {
    return dateString1 <= dateString2
  }

  isLaterOrEqual(dateString1, dateString2) {
    return dateString1 >= dateString2
  }

}
