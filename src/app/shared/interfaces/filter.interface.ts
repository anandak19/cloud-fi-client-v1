export interface IRangeFilter {
  startDate: string;
  endDate: string;
}

export interface IPaginationFilter {
  page: number;
  limit: number;
}

export type ITableLisingFilter = Partial<IRangeFilter> & Partial<IPaginationFilter>;
