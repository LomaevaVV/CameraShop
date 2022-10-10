
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Promo } from '../../types/promo';

export const getPromo = (state: State): Promo | null => state[NameSpace.Promo].promo;
export const getPromoFetchStatus = (state: State): string => state[NameSpace.Promo].promoFetchStatus;

