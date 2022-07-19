import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import './header.styles.scss';
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux';
import  CartIcon  from '../cart-icon/cart-icon.component'

const Header = ({currentUser, hidden}) => ( // this is the same name as in mapStateToProps before :
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

const mapStateToProps = ({user:{currentUser}, cart:{hidden}}) => ({
  currentUser,
  hidden
}); 


export default connect(mapStateToProps)(Header);