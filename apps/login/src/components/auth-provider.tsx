import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

// These routes are accessible for unauthenticated users
const authRoutes = [
  "/loginname",
  "/password",
  "/password/set",
  "/otp/time-based",
  "/otp/sms",
  "/otp/email",
];

export default async function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const _headers = await headers();
  const pathname = _headers.get("x-pathname");
  const isAuthRoute = authRoutes.includes(pathname || "");

  const _cookies = await cookies();
  const loginName = _cookies.get("loginName")?.value;
  const organization = _cookies.get("organization")?.value;

  let isAuthenticated = false;
  if (loginName && organization) {
    const cookieHeader = (await headers()).get("cookie") || "";
    const response = await fetch(
      `${process.env.BASE_PATH}/api/validate-session`,
      {
        method: "POST",
        body: JSON.stringify({ loginName, organization }),
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieHeader,
        },
      },
    );

    if (response.ok) {
      isAuthenticated = true;
    }
  }

  if (isAuthRoute && isAuthenticated) {
    return redirect(`${process.env.APP_BASE_PATH}/app/home`);
  }

  if (!isAuthRoute && !isAuthenticated) {
    return redirect(`${process.env.BASE_PATH}/loginname`);
  }

  return children;
}
