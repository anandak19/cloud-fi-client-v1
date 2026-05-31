import { IListApiResponse } from "@shared/interfaces/common-api-response.interface";

export interface ICoupon {
  id: string;
  couponNumber?: string;
  profile: string;
  count: number;
  cost: number;
  phoneNumber: string;
  date: string;
  createdAt: string;
}

export interface IDateRangeInfo {
  period: string;
  startDate: string | null;
  endDate: string | null;
}

//resonse body
export interface IUserVouchersPayload {
  vouchers: ICoupon[];
}

export interface IUserVoucherSaleResponse extends IDateRangeInfo, IUserVouchersPayload {}

export interface IVoucherBase {
  id: string;
  couponNumber: string;
  profile: string;
  count: number;
  cost: number;
  phoneNumber: string;
}

export interface IVoucherSaleHistory extends IVoucherBase {
  soldBy: string;
  timeStamp: string;
}

// API response
export interface IVoucherHistoryResponse extends IListApiResponse {
  voucherHistory: IVoucherSaleHistory[];
}


