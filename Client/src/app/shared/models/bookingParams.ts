export class BookingParams {
  pageNumber = 1;
  pageSize = 12;
  start: Date;
  end: Date;
  sort = 'startdatedesc';
  search: string;
  chargingPointId: number;
  username: string;
}
