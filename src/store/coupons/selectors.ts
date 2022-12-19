import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getDiscount = (state: State): number => state[NameSpace.Coupons].discount;
export const getCouponPostStatus = (state: State): string => state[NameSpace.Coupons].couponPostStatus;
export const getCoupon = (state: State): string => state[NameSpace.Coupons].coupon;
