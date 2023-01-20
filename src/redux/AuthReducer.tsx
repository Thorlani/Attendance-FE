import { AuthType } from "./AuthType";

const initialState = {
  parameter: null,
};

export const Auth = (state = initialState, action: any) => {
  switch (action.type) {
    case AuthType:
      return {
        ...state,
        parameter: action.payload,
      };
    default:
      return state;
  }
};
