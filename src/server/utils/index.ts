import {compare, genSalt, hash} from "bcrypt";

import {ENV} from "@/env";

export const encryptPassword = async (password: string) => {
  const salt = await genSalt(ENV.SALT_ROUNDS);

  return hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string,
) => {
  return compare(password, hash);
};
