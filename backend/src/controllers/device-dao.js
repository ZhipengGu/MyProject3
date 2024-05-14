/**
 * Notification controllers for creating, deleting tokens.
 */

import Token from "../models/Tokens-schema.js";

// Create Token
export const createToken = async (tokenData) => {
  try {
    const token = new Token(tokenData);
    await token.save();
    return token;
  } catch (error) {
    throw new Error(`Error while creating new token: ${error.message}`);
  }
};


//Delete Token
export const deleteToken = async (token) => {
  try {
    const deletedToken = await Token.findOneAndDelete(token);
    return deletedToken;
  } catch (error) {
    throw new Error(`Error while deleting token: ${error.message}`);
  }
};


