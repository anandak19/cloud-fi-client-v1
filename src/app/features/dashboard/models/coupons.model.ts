
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

export interface IUserVoucherSaleResponse
  extends IDateRangeInfo,
    IUserVouchersPayload {}

