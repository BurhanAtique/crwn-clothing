import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component'
import { connect } from 'react-redux';

import './cart-dropdown.styles.scss';
import { selectCartItems } from '../../redux/cart/cart.selector';

const CartDropdown = ({cartItems}) => ( //these are our props
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.map(cartItem => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

// const mapStateToProps = ({cart}) =>({ // this also a way
//   cartItems: cart.cartItems
// });

// const mapStateToProps = ({ cart: { cartItems } }) => ({ // this is destructuring
//   cartItems
// });

// calling selecor to make sure cart drop down is not re rendered whenever state changes that's unrelated to cartItems
const mapStateToProps=(state)=>({
    cartItems: selectCartItems(state)
});


export default connect(mapStateToProps)(CartDropdown);