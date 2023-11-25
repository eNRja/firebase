import React, { useEffect } from "react";
import styles from "./App.module.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { Header } from "../header/Header";
import { CreatePromo } from "../create-promo/CreatePromo";
import { Route, Routes } from "react-router-dom";
import { Promotions } from "../promotions/Promotions";
import { ErrorNotFound } from "../error-not-found/ErrorNotFound";
import { getPromotions } from "../../services/actions/promotions";
import { useDispatch } from "../../hooks/hooks";

const firebaseConfig = {
  apiKey: "AIzaSyD3gcQSHJ7XZRZL6761SdmXVeIahoTQOfU",
  authDomain: "fir-react-6420c.firebaseapp.com",
  projectId: "fir-react-6420c",
  storageBucket: "fir-react-6420c.appspot.com",
  messagingSenderId: "569740360643",
  appId: "1:569740360643:web:f5d649ce6206a7ed971b76",
  measurementId: "G-J0H4G5SSSV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function App() {


  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route path="/" element={<CreatePromo db={db} />} />
        <Route path="/promotions" element={<Promotions db={db} />} />
        <Route path="/*" element={<ErrorNotFound />} />
      </Routes>
    </div>
  );
}
