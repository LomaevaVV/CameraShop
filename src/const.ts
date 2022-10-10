export enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  Product = '/product/:id',
  NotFound = '/*'
}

export const APIRoute = {
  Cameras: '/cameras',
  Promo: '/promo'
} as const;

export enum NameSpace {
  Cameras = 'CAMERAS',
  Promo = 'PROMO'
}

export const enum FetchStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Rejected = 'REJECTED',
}
