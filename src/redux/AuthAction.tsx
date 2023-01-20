import { AuthType } from "./AuthType";

export const AuthAction = (parameter = false) => {
  return {
    type: AuthType,
    payload: parameter,
  };
};
