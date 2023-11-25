import { Firestore } from "firebase/firestore";

export type TPromotions = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  link: string;
  level: number;
};

export type TPromoState = {
  promotions: TPromotions[] | [];
  showSuccessMessage: boolean;
};

export type TPostPromo = {
  dateEnd: string;
  dateStart: string;
  db: Firestore;
  description: string;
  levels: string[];
  link: string;
  title: string;
};
