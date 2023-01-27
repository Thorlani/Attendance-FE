import { AuthType, IncreaseType } from "./AuthType";

export const AuthAction = (qty = 1) => {
  return {
    type: AuthType,
    payload: qty,
  };
};

export const RedoAction = (qty = 0) => {
  return {
    type: IncreaseType,
    payload: qty,
  };
};
