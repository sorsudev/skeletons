import { combineReducers } from 'redux';
import authReducer from './authReducer';
import sampleReducer from './sampleReducer';

const rootReducer = combineReducers({
  authentication: authReducer,
  sample: sampleReducer,
});

export default rootReducer;