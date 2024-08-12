import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up.component/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserDocumentFromAuth } from "./firebase/firebase.utils";
import { getDoc } from 'firebase/firestore'; // Import getDoc
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
    this.unsubscribeFromAuth = null;
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log('Auth state changed:', userAuth); // Debugging line
      if (userAuth) {
        const userDocRef = await createUserDocumentFromAuth(userAuth);
        const userDoc = await getDoc(userDocRef);
        this.setState({
          currentUser: {
            id: userDoc.id,
            ...userDoc.data()
          }
        });
      } else {
        this.setState({ currentUser: null });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribeFromAuth) {
      this.unsubscribeFromAuth();
    }
  }

  render() {
    console.log('Current user in App:', this.state.currentUser); // Debugging line
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/sign-in" element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
