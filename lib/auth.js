import { hash, compare } from "bcrypt";

export const hashPassword = async (password) => {
  const salt = 12;
  const encrypted = await hash(password, salt);
  return encrypted;
};

export const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
