import { CookieKey } from '@src/constants';
import { setCookie } from '@src/utils';
import { AnyAction } from 'redux';
import { Actions } from '@src/redux/actions';

export interface AppState {
  authorization: string;
  isDingtalkReady: boolean;
  isAppVisible: boolean;
}

const initialState: AppState = {
  authorization: '',
  isDingtalkReady: false,
  isAppVisible: true
};

export default function (
  state: AppState = initialState,
  action: AnyAction
): AppState {
  switch (action.type) {
    case Actions.UPDATE_AUTHORIZATION:
      setCookie(CookieKey.AUTHORIZATION, action.authorization, 30);
      return Object.assign({}, state, { authorization: action.authorization });
    case Actions.SET_DINGTALK_READY:
      return Object.assign({}, state, { isDingtalkReady: true });
    case Actions.SET_APP_VISIBILITY:
      return Object.assign({}, state, { isAppVisible: action.isAppVisible });
    default:
      return state;
  }
}
