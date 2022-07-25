import {createSelector} from 'reselect';

//this is our input selector that is just returning a piece of state 
const selectCart = state => state.cart;

//it is called memoized selector(memoization)
export const selectCartItems = createSelector( // takes 2 arguments, 1st is input selector, 2nd is the
    // the fucntiom that return the value we want out of this selector
    [selectCart],(cart=>cart.cartItems)
);

export const selectCartItemsCount = createSelector([selectCartItems],(cartItems=>
    cartItems.reduce(
        (accumulator,cartItem)=> 
        accumulator+cartItem.quantity,0)));
