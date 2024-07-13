import { User } from "./user.interface";

export interface UserSettings {
  id?: string;
  user?: User;
  changeThreshold?: number;
  weightUnit?: string;
}
