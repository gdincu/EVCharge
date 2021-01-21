import { IChargingPoint } from './chargingPoint';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IChargingPoint[];
}
