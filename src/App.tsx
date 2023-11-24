import React, { ChangeEvent, useEffect, useState } from "react";
import Logo from "./logo.svg";
import styles from "./App.module.css";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { DocumentData, QuerySnapshot, getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import { serverTimestamp, Timestamp } from "firebase/firestore";

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
// const analytics = getAnalytics(app);

export function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setStart] = useState("");
  const [dateEnd, setEnd] = useState("");
  const [link, setLink] = useState("");
  const [levels, setLevels] = useState([]); // Используем массив для хранения выбранных уровней
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Состояние для уведомления

  const onSave = async () => {
    console.log("start");
    try {
      const docRef = await addDoc(collection(db, "promotions"), {
        title,
        description,
        isSite: true,
        level: levels, // Используем состояние уровня
        lang: "ru",
        btnLink: "Записаться",
        link: link,
        end: Timestamp.fromDate(new Date(dateEnd)),
        start: Timestamp.fromDate(new Date(dateStart)),
      });
      console.log("Document written successfully");
      setShowSuccessMessage(true); // Показываем сообщение об успешном сохранении
      setTimeout(() => setShowSuccessMessage(false), 3000); // Автоматически скрываем сообщение через 3 секунды
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLevels: string[] | any = Array.from(
      event.target.selectedOptions,
      (option: HTMLOptionElement) => option.value
    );
    if (selectedLevels) {
      setLevels(selectedLevels);
    }
  };

  useEffect(() => {
    getDocs(collection(db, "promotions")).then(
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        querySnapshot.forEach((doc) => {
          //  console.log(`${doc.id} => ${doc.data().title}`);
        });
      }
    );
  }, []);

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={Logo} className={styles.AppLogo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={styles.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <input
        type="date"
        placeholder="дата старта"
        // type={"date"}
        value={dateStart}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="date"
        placeholder="дата окончания"
        // type={"date"}
        value={dateEnd}
        onChange={(e) => setEnd(e.target.value)}
      />
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ссылка"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <input
        type="text"
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select multiple value={levels} onChange={handleLevelChange}>
        <option value="A1">A1</option>
        <option value="A2">A2</option>
        <option value="B1">B1</option>
        <option value="B2">B2</option>
        <option value="C1">C1</option>
      </select>
      <button onClick={onSave}>SAVE</button>
      {showSuccessMessage && <div>Данные успешно сохранены!</div>}{" "}
      {/* Условный рендеринг уведомления */}
    </div>
  );
}
