import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getOrderPostStatus = (state: State): string => state[NameSpace.Order].orderPostStatus;
