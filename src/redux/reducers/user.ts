import { Role } from '@src/constants';
import { AnyAction } from 'redux';
import { Actions } from '@src/redux/actions';

export interface UserState {
  id: number;
  name: string;
  role: string;
}

const initialState: UserState = {
  id: 0,
  name: '',
  role: ''
};

export default function (
  state: UserState = initialState,
  action: AnyAction
): UserState {
  switch (action.type) {
    case Actions.SET_USER_INFO:
      return action.userInfo;
    default:
      return state;
  }
}
