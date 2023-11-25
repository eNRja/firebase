import {
  DocumentData,
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { TPostPromo } from "../types/data";

export const postPromotionApi = async (data: TPostPromo) => {
  const { db, title, description, levels, link, dateEnd, dateStart } = data;
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
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getPromotionsApi = ({ db }: any) => {
  return getDocs(collection(db, "promotions"));
};

export const deletePromotionApi = async (data: any) => {
  const { db, id } = data;
  console.log("start");
  try {
    const docRef = doc(db, "promotions", id);
    await deleteDoc(docRef);
    console.log("Document delete successfully");
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};
