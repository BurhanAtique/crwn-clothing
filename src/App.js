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

class App extends Component {
 
  unsubscribeFromAuth = null;

  componentDidMount(){
    console.log("me",this.props);
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{ //(called opened subscription) this connection is opened as long as this app is running and as soon as the status of user is changed i.e gigned out it 
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />): (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
  
}
const mapStateToProps = ({user}) => ({ // this is required when we need some value in this component from the store so we map state(which is present on store) to the props in the current component
  currentUser: user.currentUser
});
const mapDispatchToProps = dispatch => ({ // this dispatch is a method  that is being passed as an argument
    setCurrentUser: user => dispatch(setCurrentUser(user)) // here in this dispatch method setCurrentUser is the action object which will be passed to every reducer as mentiond in notes
});

export default connect(mapStateToProps,mapDispatchToProps)(App);  
