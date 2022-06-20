import { Types } from '../constants/actionTypes';

const initialState = {
  profile: {
    name: '',
    username: '',
    account: [],
    currentAccount: {},
    email: ''
  },
}

const reducer = (state = initialState, action) => {
  console.log('loginType', action.type, Types.LOGIN, state, action.payload)
  switch (action.type) {
    case Types.LOGIN:
      console.log('Im loging');
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false // after update user formsubmition reset
      }
    case Types.REGISTER:
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false // after update user formsubmition reset
      }
    default:
      return state;
  }
}

export default reducer;