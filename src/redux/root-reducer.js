import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // to get localStorage Object of window
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root', // this is at what point we want to tell to save our reducer objects
    storage,
    whitelist: ['cart'] // we pass the redicers name here in string
  };

const rootReducer= combineReducers({
    user:userReducer,
    cart: cartReducer,
    directory:directoryReducer,
    shop:shopReducer
});

export default persistReducer(persistConfig, rootReducer); 