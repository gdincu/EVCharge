import { IBooking } from './booking';


export interface IPaginationBooking {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IBooking[];
}

export class PaginationBooking implements IPaginationBooking {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IBooking[] = [];
}
