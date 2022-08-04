import React from 'react';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selector.js';

import { selectCurrentUser } from '../../redux/user/user.selector.js';
import './header.styles.scss';
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux';
import  CartIcon  from '../cart-icon/cart-icon.component'

const Header = ({currentUser, hidden}) => ( // currentUser is the same name as in mapStateToProps(commented method) before :
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      { 
        currentUser ?
        <div className='option' onClick={()=>auth.signOut()}>Sign Out</div>
        :
        <Link to='/signin'>Sign In</Link>
      }
      <CartIcon />
    </div>
    {hidden?null:<CartDropdown/>}
    
  </div>
);

// here this state is the root reducer
// const mapStateToProps = state => ({
//   currentUser: state.user.currentUser
// });

// const mapStateToProps = ({user:{currentUser}, cart:{hidden}}) => ({ // here user & cart before : are the names of the reducers in rootReducers..this is alo one way of destructuring
//   currentUser,
//   hidden
// }); 

// const mapStateToProps=(state)=>({ // if we have 5 6 selectors then we'll have to instantiate this all 5 times
//so to avoid it we use   createStructuredSelector which directly maps to right properties
//   currentUser:selectCurrentUser(state),
//   hidden: selectCartHidden(state)
// });

const mapStateToProps=createStructuredSelector({ // this directly maps our attributes to
  currentUser:selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);