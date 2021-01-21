import { IBooking } from './booking';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IBooking[];
}
