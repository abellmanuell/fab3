import {
  createUser,
  findUser,
  findUserById,
  updateUser,
} from "@/lib/db/userDB";
import { createSession } from "@/lib/session";
import "dotenv/config";
import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";

interface UserDataProps {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expiry_date: string;
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code") as string;
    const googleOAuthError = searchParams.get("error") as string;
    const redirectUrl = `${process.env.REDIRECT_URL}/api/auth/fab3_auth`;

    console.log(code);
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    /* Get credentials */
    const authResponse = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(authResponse.tokens);
    const credentials = oAuth2Client.credentials as any;

    const userData = await getUserData(credentials);

    if (googleOAuthError) {
      return NextResponse.redirect(
        `${process.env.REDIRECT_URL}/login?success=false&message=${googleOAuthError}!`
      );
    }

    if (userData?.isAuthSuccess) {
      return NextResponse.redirect(
        `${process.env.REDIRECT_URL}/airdrops?success=true&message=Successfully created!`
      );
    }
  } catch {
    console.error("Error with signing on Google");
  }
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

  const { sub, email } = await response.json();
  const existingUser = (await findUser(email)) as any;

  const userOAuthCredentials = {
    access_token,
    token_type,
    refresh_token,
    expiry_date,
    email,
    google_id: sub,
  };

  const isGoogleIdExist = Object.hasOwn(existingUser, "google_id");
  /* Check whether user exist */
  if (existingUser && isGoogleIdExist) {
    // Create user session
    await createSession(existingUser._id);
    return { isAuthSuccess: true };
  }

  /*************************************************
   * Updated existing user without google_id
   * ***********************************************/
  if (existingUser && !isGoogleIdExist) {
    await updateUser(existingUser._id, userOAuthCredentials);
    // Create user session
    await createSession(existingUser._id);

    return { isAuthSuccess: true };
  }

  /**********************
   *  CREATE A USER
   * *********************/
  const userCreated = await createUser(userOAuthCredentials);

  if (userCreated.acknowledged) {
    const existingUser =
      userCreated.insertedId &&
      ((await findUserById(userCreated.insertedId)) as any);

    // Create user session
    await createSession(existingUser._id);

    return { isAuthSuccess: true };
  }
}
