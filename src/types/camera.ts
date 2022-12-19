export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
};

export type CamerasFetchParams = {
  pageId: number;
  sortType: string | null;
  sortOrder: string | null;
  category: string | string[] | null;
  type: string | string[] | null;
  level: string | string[] | null;
  minPrice: string | string[] | null;
  maxPrice: string | string[] | null;
}

export type CamerasPriceRange = {
  camerasMinPrice: number;
  camerasMaxPrice: number;
}

export type CameraInBasket = {
  id: number;
  amount: number;
  camera: Camera;
}

export type CamerasInBasket = CameraInBasket[];

export type Cameras = Camera[];
