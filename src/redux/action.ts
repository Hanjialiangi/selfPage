import { AnyAction } from 'redux';
import { DECREMENT, INCREMENT } from '../constants';

export const increment = (): AnyAction => ({
  type: INCREMENT
});

export const decrement = (): AnyAction => ({
  type: DECREMENT
});
