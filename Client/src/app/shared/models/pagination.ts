import { IChargingPoint } from './chargingPoint';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IChargingPoint[];
}

export class Pagination implements IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IChargingPoint[] = [];
}
