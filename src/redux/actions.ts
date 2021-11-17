import { AnyAction } from 'redux';
import { UserState } from './reducers/user';

export enum Actions {
  UPDATE_AUTHORIZATION,
  SET_DINGTALK_READY,
  SET_USER_INFO,
  SET_APP_VISIBILITY
}

export const updateAuthAction = (authorization: string): AnyAction => ({
  type: Actions.UPDATE_AUTHORIZATION,
  authorization
});

export const setDingtalkReadyAction = (): AnyAction => ({
  type: Actions.SET_DINGTALK_READY
});

export const setUserInfoAction = (userInfo: UserState): AnyAction => ({
  type: Actions.SET_USER_INFO,
  userInfo
});

export const setAppVisibilityAction = (isAppVisible: boolean): AnyAction => ({
  type: Actions.SET_APP_VISIBILITY,
  isAppVisible
});
