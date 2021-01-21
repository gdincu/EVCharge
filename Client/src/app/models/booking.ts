export interface IBooking {
  id: number;
  userId: number;
  chargingPointId: number;
  start: string;
  end: string;
  price: number;
  createdTimestamp: string;
}
