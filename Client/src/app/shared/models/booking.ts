export interface IBooking {
  id: string;
  userId: string;
  chargingPointId: number;
  start: string;
  end: string;
  price: number;
  createdTimestamp: string;
}
