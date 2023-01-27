import { actions } from "react-table";
import { AuthType, IncreaseType } from "./AuthType";

const initialState = {
  parameter: 0,
};

export const Auth = (state = initialState, action: any) => {
  switch (action.type) {
    case AuthType:
      return {
        ...state,
        parameter: state.parameter + action.payload,
      };
    case IncreaseType:
      return {
        ...state,
        parameter: action.payload,
      };
    default:
      return state;
  }
};
