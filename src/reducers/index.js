import { combineReducers } from 'redux';
import messageReducer from './common/messageReducer';

const rootReducer = combineReducers({
  messageReducer,
});

export default rootReducer;
