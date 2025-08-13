import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string): any => {
  return jwtDecode(token);
};
