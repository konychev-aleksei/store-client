import React, { useState, useEffect } from "react";
import "./style.module.scss";
import { AuthPanel } from "./UI/AuthPanel/AuthPanel";

import { Startup } from "./pages/Startup/Startup";
import { ProductsList } from "./pages/ProductsList/ProductsList";
import { OrdersList } from "./pages/OrdersList/OrdersList";

import { auth } from "./firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import * as api from "./api/index";

import { Route, Routes } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState("");
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [currentOrder, setCurrentOrder] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await api.querySearch(query);
    setProducts(data);

    navigate(`/search`);
  };

  const signInGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch (e) {
      console.error(e);
    }
  };

  const signOut = async () => {
    setQuery("");
    await auth.signOut();
  };

  useEffect(() => {
    (async () => {
      if (user) {
        const currentUser = user.email.replace("@gmail.com", "");
        setCurrentUser(currentUser);
        await api.createUser(currentUser);
      } else {
        setCurrentUser(null);
      }
    })();
  }, [user]);

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Startup
              handleSubmit={handleSubmit}
              query={query}
              setQuery={setQuery}
            />
          }
        />
        <Route
          exact
          path="/search"
          element={
            <ProductsList
              products={products}
              handleSubmit={handleSubmit}
              query={query}
              setQuery={setQuery}
              currentUser={currentUser}
              currentOrder={currentOrder}
              setCurrentOrder={setCurrentOrder}
            />
          }
        />
        <Route
          exact
          path="/order/:order"
          element={
            <ProductsList
              isOrder
              products={products}
              handleSubmit={handleSubmit}
              query={query}
              setQuery={setQuery}
              currentUser={currentUser}
              currentOrder={currentOrder}
              setCurrentOrder={setCurrentOrder}
            />
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <OrdersList currentUser={currentUser} currentOrder={currentOrder} />
          }
        />
      </Routes>
      <AuthPanel
        user={user}
        signInGoogle={signInGoogle}
        signOut={signOut}
        inOrder={window.location.href.includes("/orders")}
      />
    </>
  );
};

export default App;
