import React, { useState } from "react";
import "./App.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Nav from "./components/Nav";

function App() {

  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user)
      }
    })
  }, []);

  function register() {
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
    .then(({ user }) => {
      console.log(user);
      setUser(user)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }
  return (
    <div className="App">
      <Nav login={login} register={register} logout={logout} user={user} loading={loading}/>
      <h5>{user.email}</h5>
    </div>
  );
}

export default App;
