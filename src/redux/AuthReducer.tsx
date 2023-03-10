import { actions } from "react-table";
import { AuthType, DecreaseType, IncreaseType } from "./AuthType";

const initialState = {
  parameter: 1,
  destination: 0,
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
        parameter: state.parameter + action.payload,
      };
    case DecreaseType:
      return {
        ...state,
        destination: action.payload,
      };
    default:
      return state;
  }
};
