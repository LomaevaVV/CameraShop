export const MAX_CARDS_ON_PAGE = 9;
export const DEFAULT_CATALOG_PAGE = 1;
export const PAGINATION_STEP = 1;
export const PAGE_PATH_ARRAY_IDX = 1;
export const MAX_CARDS_ON_SLIDER = 3;
export const MORE_REVIEWS_STEP = 3;
export const SCROLL_TIMEOUT = 1000;
export const MIN_LENGTH_REVIEW = 5;

export enum AppRoute {
  Main = '/',
  Catalog = '/catalog',
  CatalogPage = '/catalog/page_:page',
  Product = '/product/:id',
  NotFound = '/*',
  Basket = '/basket'
}

export const APIRoute = {
  Cameras: '/cameras',
  Camera: '/cameras/:id',
  Promo: '/promo',
  Reviews: '/reviews',
  Сoupons: '/coupons',
  Orders: '/orders'
} as const;

export enum NameSpace {
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
  App = 'APP',
  Reviews = 'REVIEWS',
  Coupons = 'COUPONS',
  Order = 'ORDER'
}

export const enum FetchStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Rejected = 'REJECTED',
}

export enum ClassName {
  Product = 'product',
  ProductCard = 'product-card',
  ReviewCard = 'review-card',
}

export enum ModalState {
  Closed = 'closed',
  ReviewForm = 'reviewForm',
  ReviewSuccess = 'reviewSuccess',
  BasketAddItem = 'basketAddItem',
  BasketDelItem = 'basketDelItem',
  BasketSuccess = 'basketSuccess',
  OrderSuccess = 'orderSuccess'
}

export enum ProductTubs {
  Description = 'description',
  Features = 'features'
}

export const queryParams: {[key:string]: string} = {
  camerasAmountOnPage: '_limit',
  firstCameraOnPage: '_start',
  seachByName: 'name_like',
  sortType: '_sort',
  sortOrder: '_order',
  type: 'type',
  category: 'category',
  level: 'level',
  minPrice: 'price_gte',
  maxPrice: 'price_lte'
} as const;

export const enum SortType {
  Price = 'price',
  Rating = 'rating'
}

export const enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export const FilterNames: {
  [key: string]: {
    [key: string]: string;
  };
} =
  {
    category: {
      photocamera: 'Фотоаппарат',
      videocamera: 'Видеокамера',
    },
    type: {
      digital: 'Цифровая',
      film: 'Плёночная',
      snapshot: 'Моментальная',
      collection: 'Коллекционная'
    },
    level: {
      zero: 'Нулевой',
      nonProfessional: 'Любительский',
      professional: 'Профессиональный'
    }
  } as const;

export const FilterTitles : {
      [key: string]: string;
  } =
    {
      category: 'Категория',
      type: 'Тип камеры',
      level: 'Уровень',
    } as const;

export const Coupons : {
      [key: string]: string;
  } =
    {
      'camera-333': 'camera-333',
      'camera-444': 'camera-444',
      'camera-555': 'camera-555',
    } as const;
