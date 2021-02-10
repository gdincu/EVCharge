export interface IBooking {
  id: number;
  userId: string;
  chargingPointId: number;
  start: string;
  end: string;
  price: number;
  createdTimestamp: string;
}
