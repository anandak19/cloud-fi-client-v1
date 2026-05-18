export interface IUser {
  id: string;
  email: string;
  phoneNumber: string;
  userName: string;
  userType: string;
  totalSales: number;
  totalCollectedCash: number;
  balanceLeft: number;
  userCollectedCash: number;
}

export interface ICurrentUser extends Pick<IUser, 'id' | 'email' | 'userName' | 'userType'> {}

export interface IUserFinancialSummary extends Pick<
  IUser,
  'totalSales' | 'totalCollectedCash' | 'balanceLeft' | 'userCollectedCash'
> {}
