import {
  createUser,
  findUser,
  findUserById,
  updateUser,
} from "@/lib/db/userDB";
import { createSession } from "@/lib/session";
import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";
import "dotenv/config";

interface UserDataProps {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expiry_date: string;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const googleOAuthError = searchParams.get("error");

  const redirectUrl = `${process.env.REDIRECT_URL}/api/auth/fab3_auth`;

  if (googleOAuthError) {
    return NextResponse.redirect(
      `${process.env.REDIRECT_URL}/login?success=false&message=${googleOAuthError}`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${process.env.REDIRECT_URL}/login?success=false&message=Missing Google auth code`
    );
  }

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  try {
    const authResponse = await exchangeCodeWithRetry(oAuth2Client, code);
    oAuth2Client.setCredentials(authResponse.tokens);
    const credentials = oAuth2Client.credentials as unknown as UserDataProps;

    const userData = await getUserData(credentials);

    if (userData?.isAuthSuccess) {
      return NextResponse.redirect(
        `${process.env.REDIRECT_URL}/airdrops?${new URLSearchParams({
          success: "true",
          message: "Successfully signed in",
        }).toString()}`
      );
    }

    throw new Error("User authentication failed.");
  } catch (error: any) {
    console.error("Google OAuth Error:", {
      message: error.message,
      code: error.code,
      response: error.response?.data,
    });

    return NextResponse.redirect(
      `${process.env.REDIRECT_URL}/login?success=false&message=Google OAuth failed`
    );
  }
}

/***************************************
 *
 *   EXCHANGE CODE WITH RETRY
 *
 **************************************/
async function exchangeCodeWithRetry(
  oAuth2Client: OAuth2Client,
  code: string,
  retries = 3,
  delayMs = 500
) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await oAuth2Client.getToken(code);
    } catch (error: any) {
      const isInvalidGrant = error?.response?.data?.error === "invalid_grant";

      if (attempt === retries || !isInvalidGrant) {
        throw error; // Final attempt or not retryable
      }

      console.warn(
        `Attempt ${attempt} failed with invalid_grant. Retrying in ${delayMs}ms...`
      );
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }

  throw new Error("Token exchange failed after multiple attempts.");
}

/***************************************
 *
 *   GET USER DATA FROM GOOGLE
 *
 **************************************/
async function getUserData({
  access_token,
  token_type,
  refresh_token,
  expiry_date,
}: UserDataProps) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  const { sub: google_id, email } = await response.json();
  const existingUser = await findUser(email);

  const userOAuthCredentials = {
    access_token,
    token_type,
    refresh_token,
    expiry_date,
    email,
    google_id,
  };

  if (existingUser) {
    const hasGoogleId = "google_id" in existingUser;

    if (hasGoogleId) {
      await createSession(existingUser._id);
      return { isAuthSuccess: true };
    } else {
      await updateUser(existingUser._id, userOAuthCredentials);
      await createSession(existingUser._id);
      return { isAuthSuccess: true };
    }
  }

  const userCreated = await createUser(userOAuthCredentials);

  if (userCreated.acknowledged && userCreated.insertedId) {
    const newUser = await findUserById(userCreated.insertedId);
    if (newUser) {
      await createSession(newUser._id);
      return { isAuthSuccess: true };
    }
  }

  return { isAuthSuccess: false };
}
