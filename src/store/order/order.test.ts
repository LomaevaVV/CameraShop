import { FetchStatus } from '../../const';
import { postOrderAction } from '../api-actions';
import { dataOrder, DataOrder } from './order';

describe('Reducer: coupons', () => {
  let state: DataOrder;

  beforeEach(() => {
    state = {
      orderPostStatus: FetchStatus.Idle,
    };
  });


  it('without additional parameters should return initial state', () => {
    expect(dataOrder.reducer(state, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('postOrderAction test', () => {

    it('should update couponPostStatus by posting order', () => {
      expect(dataOrder.reducer(state, { type: postOrderAction.pending.type }))
        .toEqual({
          orderPostStatus: FetchStatus.Loading,
        });
    });

    it('should update postOrderAction by success posting order', () => {
      expect(dataOrder.reducer(state, { type: postOrderAction.fulfilled.type }))
        .toEqual({
          orderPostStatus: FetchStatus.Success,
        });
    });


    it('should update postOrderAction by rejected posting order', () => {
      expect(dataOrder.reducer(state, { type: postOrderAction.rejected.type }))
        .toEqual({
          orderPostStatus: FetchStatus.Rejected,
        });
    });
  });

});
