export interface IBooking {
  id: number;
  userId: string;
  chargingPointId: number;
  start: string;
  end: string;
  price: number;
  createdTimestamp: string;
}

export interface IBookingToCreate {
  id: number;
  UserId: string;
  ChargingPointId: number;
  Start: string;
  End: string;
  Price: number;
  CreatedTimestamp: string;
}
