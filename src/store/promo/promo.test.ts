import { FetchStatus } from '../../const';
import { makeFakePromo } from '../../tests/mocks';

import { fetchPromoAction } from '../api-actions';
import { DataPromo, dataPromo } from './promo';
import { Promo } from '../../types/promo';

const fakePromo: Promo = makeFakePromo();

describe('Reducer: cameras', () => {
  let state: DataPromo;

  beforeEach(() => {
    state = {
      promo: null,
      promoFetchStatus: FetchStatus.Idle,
    };
  });


  it('without additional parameters should return initial state', () => {
    expect(dataPromo.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchPromoAction test', () => {

    it('should update promoFetchStatus by loading promo', () => {
      expect(dataPromo.reducer(state, { type: fetchPromoAction.pending.type }))
        .toEqual({
          promo: null,
          promoFetchStatus: FetchStatus.Loading,
        });
    });

    it('should update promo and promoFetchStatus by load promo', () => {
      expect(dataPromo.reducer(state, { type: fetchPromoAction.fulfilled.type, payload: fakePromo }))
        .toEqual({
          promo: fakePromo,
          promoFetchStatus: FetchStatus.Success,
        });
    });

    it('should update promoFetchStatus by fetchPromoAction rejected', () => {
      expect(dataPromo.reducer(state, { type: fetchPromoAction.rejected.type }))
        .toEqual({
          promo: null,
          promoFetchStatus: FetchStatus.Rejected,
        });
    });
  });

});

