import { CombinedState, combineReducers } from 'redux';
import app, { AppState } from '@src/redux/reducers/app';
import user, { UserState } from '@src/redux/reducers/user';

export type State = CombinedState<{ app: AppState; user: UserState }>;

export default combineReducers({
  app,
  user
});
