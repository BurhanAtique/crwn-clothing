import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

import './cart-dropdown.styles.scss';
import { selectCartItems } from '../../redux/cart/cart.selector';

const CartDropdown = ({cartItems, history,dispatch}) => ( //these are our props
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
    
        cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      )
        : 
        (
          <span className='empty-message'>Your cart is empty</span>
        )

    }
    </div>
    <CustomButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}>GO TO CHECKOUT</CustomButton>
  </div>
);

// const mapStateToProps = ({cart}) =>({ // this also a way
//   cartItems: cart.cartItems
// });

// const mapStateToProps = ({ cart: { cartItems } }) => ({ // this is destructuring where cart is cominf from the state
//   cartItems
// });

// calling selecor to make sure cart drop down is not re rendered whenever state changes that's unrelated to cartItems
// const mapStateToProps=(state)=>({
//     cartItems: selectCartItems(state)
// });

const mapStateToProps=createStructuredSelector({
  cartItems:selectCartItems
});

// Now, the way that we're used to doing this inside our connect would be to write our map, dispatch
// the props, and then pass in a dispatch call of our action creator of Target Card Hidden.
// Now, what we might not know is that Connect actually passes dispatch into our components as a prop
// if we do not supply a second argument to connect.
// So if we don't supply map, dispatch the props as the second parameter connect will pass the dispatch
// into our dropdown.
// So our component as a prop..
// And the reason it does this is because.
// If we need to make one off action dispatches, well, there's no reason to write another map dispatch
// to props, it might be more verbose. 
// thais s why


//higher order component takes component as argument and returns a new component
export default withRouter(connect(mapStateToProps)(CartDropdown));