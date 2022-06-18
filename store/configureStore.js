import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {reducer as toastrReducer} from 'react-redux-toastr'


import profile from '../reducers/profile';
let persistedState= {}
if (typeof window !== 'undefined') {
  persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {}
}
const rootReducer = combineReducers({
  user: profile,
  toastr: toastrReducer
});

const configureStore = () => {
  return createStore(
    rootReducer,
    persistedState,
    compose(applyMiddleware(thunk))
  );
};

export default configureStore;