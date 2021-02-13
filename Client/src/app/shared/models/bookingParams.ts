export class BookingParams {
  pageNumber = 1;
  pageSize = 20;
  start: Date;
  end: Date;
  sort = 'startdatedesc';
  search: string;
  chargingPointId: number;
  username: string;
}
