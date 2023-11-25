import { combineReducers } from "redux";
import { PromotionsReducer } from "./promotions";

export const rootReducer = combineReducers({
  promotion: PromotionsReducer,
});
