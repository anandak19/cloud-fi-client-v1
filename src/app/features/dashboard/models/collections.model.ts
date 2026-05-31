import { IListApiResponse } from "@shared/interfaces/common-api-response.interface";

export interface ICollectionsResponse {
  totalCashCollection: number;
  totalCollections: number;
  todayCashCollection: number;
  todayCollections: number;
  monthCashCollection: number;
  monthCollections: number;
}

export interface ICollectionHistoryItem {
  comment: string;
  createdAt: Date;
  id: string;
  paidUser: string;
  collectedUserName: string;
  collectedUserBalance: number;
  amount: number;
}

export interface ICollectionHistoryResponse extends IListApiResponse {
  collectionHistory: ICollectionHistoryItem[];
}
