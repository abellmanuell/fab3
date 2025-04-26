import jwt from "jsonwebtoken";
import "dotenv/config";

export function signToken(data: object) {
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in the environment variables");
    }
    const access_token = jwt.sign(data, process.env.SECRET_KEY);
    return {
      success: true,
      access_token,
      message: "Successfully signed",
    };
  } catch {
    return { success: false, message: "Token not sign..." };
  }
}

export function verifyToken(token: string) {
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in the environment variables");
    }
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
  } catch (err) {
    return {
      success: false,
      message: "Incorrect secret key or session expired.",
    };
  }
}
