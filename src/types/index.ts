import { ThunkAction, ThunkDispatch } from "redux-thunk";
import store from "../services/store";
import { Action, ActionCreator } from "redux";
import { TPromotionsActions } from "../services/actions/promotions";

export type TAppActions = TPromotionsActions;

export type TAppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, TRootState, Action, TAppActions>
>;

export type TAppDispatch = ThunkDispatch<TRootState, never, TAppActions>;
export type TRootState = ReturnType<typeof store.getState>;
