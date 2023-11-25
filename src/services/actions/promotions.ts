import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { TAppDispatch } from "../../types";
import {
  GET_PROMOTIONS,
  HIDE_SUCCESS_MESSAGE,
  POST_PROMOTIONS,
} from "../constants";
import {
  deletePromotionApi,
  getPromotionsApi,
  postPromotionApi,
} from "../../api";
import { TPostPromo, TPromotions } from "../../types/data";
import { prettyTime } from "../../utils/prettytime";

export interface IPostPromotionAction {
  readonly type: typeof POST_PROMOTIONS;
}

export interface IGetPromotionsAction {
  readonly type: typeof GET_PROMOTIONS;
  readonly payload: TPromotions[];
}

export interface IHideSuccessMessageAction {
  readonly type: typeof HIDE_SUCCESS_MESSAGE;
}

export type TPromotionsActions =
  | IPostPromotionAction
  | IGetPromotionsAction
  | IHideSuccessMessageAction;

export const postPromotion = (data: TPostPromo) => {
  return function (dispatch: TAppDispatch) {
    postPromotionApi(data).then((res) => {
      dispatch({
        type: POST_PROMOTIONS,
      });
      setTimeout(
        () =>
          dispatch({
            type: HIDE_SUCCESS_MESSAGE,
          }),
        3000
      );
    });
  };
};

export const getPromotions = ({ db }: any) => {
  return function (dispatch: TAppDispatch) {
    getPromotionsApi({ db }).then(
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const arr: TPromotions[] = [];
        querySnapshot.forEach((doc) => {
          arr.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            start: prettyTime(doc.data().start.seconds),
            end: prettyTime(doc.data().end.seconds),
            link: doc.data().link,
            level: doc.data().level[doc.data().level.length - 1],
          });
        });
        dispatch({
          type: GET_PROMOTIONS,
          payload: arr,
        });
      }
    );
  };
};

export const deletePromotion = (data: any) => {
  const { db } = data;
  return function (dispatch: TAppDispatch) {
    deletePromotionApi(data).then(() => {
      dispatch(getPromotions({ db }));
    });
  };
};
