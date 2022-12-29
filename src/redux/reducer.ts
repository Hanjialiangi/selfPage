import { INCREMENT, DECREMENT } from '@src/constants';

export const reducer = (
  state = {
    num: 0,
    val: 100,
    list: [
      {
        key: 1,
        name: '张三'
      },
      {
        key: 2,
        name: '李四'
      },
      {
        key: 3,
        name: '王五'
      }
    ]
  },
  action: ModifyAction
): Prop => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, num: state.num + 1 };
    case DECREMENT:
      return { ...state, num: state.num - 1 };
    default:
      return state;
  }
};

export type ModifyAction = IINCREMENTAction | IDECREMENTAction;
export interface IINCREMENTAction {
  type: string;
}

export interface IDECREMENTAction {
  type: string;
}
export interface Prop {
  num: number;
  val: number;
  list: Array<{ key: number; name: string }>;
}
