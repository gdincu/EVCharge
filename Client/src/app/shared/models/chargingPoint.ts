export interface IChargingPoint {
  id: number;
  name: string;
  description: string;
  price: number;
  chargingPointLocation: string;
  chargingPointType: string;
  qtyTotal: number;
  qtyAvailable: number;
}

export interface IChargingPointToCreate {
  id: number;
  name: string;
  description: string;
  price: number;
  chargingPointLocationId: number;
  chargingPointTypeId: number;
  qtyTotal: number;
  qtyAvailable: number;
}

export class ProductFormValues implements IChargingPointToCreate {
  id = 0;
  name = '';
  description = '';
  price = 0;
  chargingPointLocationId: number;
  chargingPointTypeId: number;
  qtyTotal: number;
  qtyAvailable: number;

  constructor(init?: ProductFormValues) {
    Object.assign(this, init);
  }
}
