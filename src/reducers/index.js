import { combineReducers } from 'redux';
import { filters} from './filters';

const appReducers = combineReducers({
    filters,
});

export default appReducers;