import { UserTypeEnum } from "./user-type.enum.js";

export type UserType = {
  name: string;
  email: string;
  avatarPath: string;
  password: string;
  type: UserTypeEnum;
}

