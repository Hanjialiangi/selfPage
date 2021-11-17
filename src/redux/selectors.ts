import { State } from '@src/redux/reducers';
import { UserState } from '@src/redux/reducers/user';

export const authorizationSelector = (state: State): string =>
  state.app.authorization;

export const isDingtalkReadySelector = (state: State): boolean =>
  state.app.isDingtalkReady;

export const userInfoSelector = (state: State): UserState => state.user;

export const isAppVisibleSelector = (state: State): boolean =>
  state.app.isAppVisible;
