import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getDiscount = (state: State): number => state[NameSpace.Coupons].discount;
