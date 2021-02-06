import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IChargingPoint } from '../shared/models/chargingPoint';
import { IChargingPointLocation } from '../shared/models/chargingPointLocation';
import { IChargingPointType } from '../shared/models/chargingPointType';
import { StoreParams } from '../shared/models/storeParams';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  //Method to return ChargingPoints
  //getChargingPoints() {
  //  return this.http.get<IPagination>(this.baseUrl + 'chargingpoints?pageindex=1&pagesize=10');
  //}

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
}
