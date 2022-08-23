import SHOP_DATA from './shop.data'
import ShopActionTypes from './shop.types';

// now because we dont need this from the file as we are getting it from firebase
// const INITIAL_STATE={
//     collections: SHOP_DATA
// }

const INITIAL_STATE={
    collections: null
}

const shopReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        default:
            return state;
    }
}
export default shopReducer;