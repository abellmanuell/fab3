import "dotenv/config";
import { OAuth2Client } from "google-auth-library";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const redirectUrl = `${process.env.REDIRECT_URL}/api/auth/fab3_auth`;

    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const authorizedUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
      ],
      prompt: "consent",
    });

    return NextResponse.redirect(authorizedUrl);
  } catch {
    console.error("Error occurred while generating Google Auth URL.");
  }
}
