import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import {selectCartItemsCount} from '../../redux/cart/cart.selector'
import {createStructuredSelector} from 'reselect';
import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => ( // here this name is the same as the one
  // in mapDispatchToProps before : and in onClick because these are the props and same for itemCount 
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()) // toggleCartHidden is just a function that triggers the dispatch toggleCartHidden 
});



// here the problem is that mapStateToProps is called everytime whenever any action is hit so it will 
//go to reducer to get the itemCount even if we are hitting login action sowe have passed whole reucer state
// const mapStateToProps=(state) =>({ // this is called selector because we are getting a whole state and from that we are just getting small potion out of it
//     itemCount: selectCartItemsCount(state)
// })

const mapStateToProps=createStructuredSelector({
  itemCount:selectCartItemsCount
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);