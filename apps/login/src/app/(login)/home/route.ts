import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const loginName = searchParams.get("loginName");
  const organization = searchParams.get("organization");

  if (!loginName || !organization) {
    return redirect(`${process.env.BASE_PATH}/accounts`);
  }

  const _cookies = await cookies();
  _cookies.set("loginName", loginName);
  _cookies.set("organization", organization);

  return redirect(`${process.env.APP_BASE_PATH}/app/home`);
}
