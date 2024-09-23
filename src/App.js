import React from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up.component/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore"; // Import onSnapshot for real-time updates

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // Subscribe to real-time updates using onSnapshot
        this.unsubscribeFromSnapshot = onSnapshot(userRef, snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    // Clean up the listeners
    if (this.unsubscribeFromAuth) this.unsubscribeFromAuth();
    if (this.unsubscribeFromSnapshot) this.unsubscribeFromSnapshot();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
