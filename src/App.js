import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Switch, Route} from 'react-router-dom';
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
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
  
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)) // here in this dispatch method setCurrentUser is the action object which will be passed to every reducer as mentiond in notes
});

export default connect(null,mapDispatchToProps)(App); // we dont need the value of the user in App so we dont need to update the props here 
