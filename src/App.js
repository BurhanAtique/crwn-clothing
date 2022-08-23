import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Switch, Route, Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import { Component } from 'react';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.action'
import { createStructuredSelector } from 'reselect';
import {selectCurrentUser} from './redux/user/user.selector.js';
import CheckoutPage from '../src/pages/checkout/checkout.component';

class App extends Component {
 
  unsubscribeFromAuth = null;

  componentDidMount(){
    console.log("me",this.props);
    const { setCurrentUser } = this.props;


    // auth.onAuthStateChanged it retuns a functio which when we call it closes subscription
    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{ //(called opened subscription just like observable pattern OR messageing system b/w our app and firebase) this connection is opened as long as this app is running and as soon as the status of user is changed i.e signed out it 
      // will notify us so we dont manually have to fetch everytime we want to check if that state has changed  
      // and this userAuth object has all the info and on signOut it gives null
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); // we have saved data in our database now 
        // we need it in our app for further usage that's why we returned  userRef object as well from createUserProfileDocument function
        
        // we'll get the new data in this snapShot object about the user we just saved 
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth); // here in this case userAuth will be null
      // addCollectionAndDocuments('collections',collectionsArray.map(({title, items})=>({title, items})));
    });
  }

  // because auth.onAuthStateChanged is open subscription we also have to close it so closing here
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />): (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
  
}

// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({ // this is required when we need some value in this component from the store so we map state(which is present on store) to the props in the current component
//   currentUser,
//   hidden
// });

const mapStateToProps = createStructuredSelector ({ 
  currentUser: selectCurrentUser,

});
const mapDispatchToProps = dispatch => ({ // this dispatch is a method  that is being passed as an argument
    setCurrentUser: user => dispatch(setCurrentUser(user)) // here in this dispatch method setCurrentUser is the action object which will be passed to every reducer as mentiond in notes
});

export default connect(mapStateToProps,mapDispatchToProps)(App);  
