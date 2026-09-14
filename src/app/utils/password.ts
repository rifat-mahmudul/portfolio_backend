import bcrypt from "bcrypt";
import { envVars } from "../config/env";

export const hashedPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, envVars.SALT_ROUNDS);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
