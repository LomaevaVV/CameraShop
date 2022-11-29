
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Camera, Cameras, CamerasPriceRange } from '../../types/camera';

export const getCameras = (state: State): Cameras | [] => state[NameSpace.Cameras].cameras;
export const getCamerasFetchStatus = (state: State): string => state[NameSpace.Cameras].camerasFetchStatus;
export const getPriceRangeByFilters = (state: State): CamerasPriceRange => state[NameSpace.Cameras].priceRangeByFilters;
export const getCarrentSearchParams = (state: State): [string, string][] => state[NameSpace.Cameras].carrentSearchParams;

export const getCamerasTotalCount = (state: State): number => state[NameSpace.Cameras].camerasTotalCount;

export const getProduct = (state: State): Camera | undefined => state[NameSpace.Cameras].product;
export const getProductFetchStatus = (state: State): string => state[NameSpace.Cameras].productFetchStatus;

export const getSimilar = (state: State): Cameras | [] => state[NameSpace.Cameras].similar;
export const getCamerasByName = (state: State): Cameras | [] => state[NameSpace.Cameras].camerasByName;
export const getPriceRange = (state: State): CamerasPriceRange => state[NameSpace.Cameras].priceRange;
export const getPriceRangeFetchStatus = (state: State): string => state[NameSpace.Cameras].priceRangeFetchStatus;
