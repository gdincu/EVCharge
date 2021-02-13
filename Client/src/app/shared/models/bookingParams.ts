export class BookingParams {
  pageNumber = 1;
  pageSize = 6;
  start: Date;
  end: Date;
  sort = 'startdatedesc';
  search: string;
  chargingPointId: number;
  username: string;
}
