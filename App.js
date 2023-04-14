import React, { useState } from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Nav from "./components/Nav";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  // Create Data

  function createPost() {
    const post = {
      title: "Start Online Cunsultancy Business",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  // Read Data

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    //Turns array into useable javascript
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostByID(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostsByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map((doc) => doc.data()));
  }

  // Update Data

  async function updatePost(id) {
    const hardCoadedId = "2JX0aE4XktQ4KPpFlKHq";
    const postRef = doc(db, "posts", hardCoadedId);
    const post = await getPostByID(hardCoadedId);
    const newPost = {
      ...post,
      title: "Land a £500k job",
    };
    updateDoc(postRef, newPost);
    console.log(newPost);
  }

  // Delete Data

  function deletePost() {
    const hardCoadedId = "2JX0aE4XktQ4KPpFlKHq";
    const postRef = doc(db, "posts", hardCoadedId);
    deleteDoc(postRef);
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
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
        setUser(user);
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
      <Nav
        login={login}
        register={register}
        logout={logout}
        user={user}
        loading={loading}
      />
      <h5>{user.email}</h5>
      <button className="create__post btn" onClick={createPost}>
        Create Post
      </button>
      <button className="create__post btn" onClick={getAllPosts}>
        Get all posts
      </button>
      <button className="create__post btn" onClick={getPostByID}>
        Get post by ID
      </button>
      <button className="create__post btn" onClick={getPostsByUid}>
        Get post by Uid
      </button>
      <button className="create__post btn" onClick={updatePost}>
        Update post
      </button>
      <button className="create__post btn" onClick={deletePost}>
        Delete post
      </button>
    </div>
  );
}

export default App;
