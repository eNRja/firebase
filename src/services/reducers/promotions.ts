import { TPromoState } from "../../types/data";
import { TPromotionsActions } from "../actions/promotions";
import {
  GET_PROMOTIONS,
  HIDE_SUCCESS_MESSAGE,
  POST_PROMOTIONS,
} from "../constants";

export const initialState: TPromoState = {
  promotions: [],
  showSuccessMessage: false,
};

export const PromotionsReducer = (
  state = initialState,
  action: TPromotionsActions
): TPromoState => {
  switch (action.type) {
    case POST_PROMOTIONS: {
      return {
        ...state,
        showSuccessMessage: true, // Показываем сообщение об успешном сохранении
      };
    }

    case HIDE_SUCCESS_MESSAGE: {
      return {
        ...state,
        showSuccessMessage: false, // Скрываем сообщение об успешном сохранении
      };
    }

    case GET_PROMOTIONS: {
      return {
        ...state,
        promotions: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
