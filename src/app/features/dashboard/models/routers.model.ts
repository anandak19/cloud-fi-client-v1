export interface IRouter {
  deviceName: string;
  port: number;
  dns: string;
  userName: string;
  callerId: string;
  _id?: string;
}

export interface IUserRouter extends IRouter {
  userId: string;
  hotspot: string;
  password: string;

  profiles: {
    [key: string]: number; // example: "30-D": 30, "29-D": 25
  };

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IListUserRouter {
  router: IUserRouter;
  id: string;
}
