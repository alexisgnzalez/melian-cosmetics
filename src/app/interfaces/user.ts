import { AuthModel } from "pocketbase";

export interface User {
  isValid: boolean;
  authModel: AuthModel | null;
  token: string;
}
