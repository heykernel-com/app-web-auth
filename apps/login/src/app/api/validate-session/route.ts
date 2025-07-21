import {
  getMostRecentCookieWithLoginname,
  getSessionCookieById,
} from "@/lib/cookies";
import { getServiceUrlFromHeaders } from "@/lib/service-url";
import { isSessionValid } from "@/lib/session";
import { getSession } from "@/lib/zitadel";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { sessionId, loginName, organization } = body;

  if (!organization || (!sessionId && !loginName)) {
    return NextResponse.json(
      { valid: false, error: "Invalid request" },
      { status: 400 },
    );
  }

  let sessionCookie;
  try {
    sessionCookie = sessionId
      ? await getSessionCookieById({ sessionId, organization })
      : await getMostRecentCookieWithLoginname({
          loginName: loginName,
          organization: organization,
        });

    if (!sessionCookie) {
      throw new Error("");
    }
  } catch {
    return NextResponse.json(
      { valid: false, error: "Session not found" },
      { status: 401 },
    );
  }

  const _headers = await headers();
  const { serviceUrl } = getServiceUrlFromHeaders(_headers);

  const sessionResponse = await getSession({
    serviceUrl,
    sessionId: sessionCookie.id,
    sessionToken: sessionCookie.token,
  });

  if (!sessionResponse?.session) {
    return NextResponse.json(
      { valid: false, error: "Session invalid" },
      { status: 401 },
    );
  }

  const valid = await isSessionValid({
    serviceUrl,
    session: sessionResponse.session,
  });

  if (!valid) {
    return NextResponse.json(
      { valid: false, error: "Session not valid" },
      { status: 401 },
    );
  }

  return NextResponse.json({ valid: true }, { status: 200 });
}
