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
  } catch (err: any) {
    return {
      success: false,
      message: `Token not signed. Error: ${err.message}`,
    };
  }
}

export function verifyToken(token: string) {
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in the environment variables");
    }
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    return {
      success: true,
      decoded,
      message: "Token successfully verified",
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Incorrect secret key or session expired. Error: ${err.message}`,
    };
  }
}
