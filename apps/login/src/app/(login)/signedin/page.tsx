import { Alert } from "@/components/alert";
import { DynamicTheme } from "@/components/dynamic-theme";
import { Translated } from "@/components/translated";
import {
  getMostRecentCookieWithLoginname,
  getSessionCookieById,
} from "@/lib/cookies";
import { completeDeviceAuthorization } from "@/lib/server/device";
import { getServiceUrlFromHeaders } from "@/lib/service-url";
import { loadMostRecentSession } from "@/lib/session";
import {
  getBrandingSettings,
  getLoginSettings,
  getSession,
} from "@/lib/zitadel";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function loadSessionById(
  serviceUrl: string,
  sessionId: string,
  organization?: string,
) {
  const recent = await getSessionCookieById({ sessionId, organization });
  return getSession({
    serviceUrl,
    sessionId: recent.id,
    sessionToken: recent.token,
  }).then((response) => {
    if (response?.session) {
      return response.session;
    }
  });
}

export default async function Page(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;

  const _headers = await headers();
  const { serviceUrl } = getServiceUrlFromHeaders(_headers);

  const { loginName, requestId, organization, sessionId } = searchParams;

  const branding = await getBrandingSettings({
    serviceUrl,
    organization,
  });

  // complete device authorization flow if device requestId is present
  if (requestId && requestId.startsWith("device_")) {
    const cookie = sessionId
      ? await getSessionCookieById({ sessionId, organization })
      : await getMostRecentCookieWithLoginname({
          loginName: loginName,
          organization: organization,
        });

    await completeDeviceAuthorization(requestId.replace("device_", ""), {
      sessionId: cookie.id,
      sessionToken: cookie.token,
    }).catch((err) => {
      return (
        <DynamicTheme branding={branding}>
          <div className="flex flex-col items-center space-y-4">
            <h1>
              <Translated i18nKey="error.title" namespace="signedin" />
            </h1>
            <p className="ztdl-p mb-6 block">
              <Translated i18nKey="error.description" namespace="signedin" />
            </p>
            <Alert>{err.message}</Alert>
          </div>
        </DynamicTheme>
      );
    });
  }

  const sessionFactors = sessionId
    ? await loadSessionById(serviceUrl, sessionId, organization)
    : await loadMostRecentSession({
        serviceUrl,
        sessionParams: { loginName, organization },
      });

  let loginSettings;
  if (!requestId) {
    loginSettings = await getLoginSettings({
      serviceUrl,
      organization,
    });
  }

  return redirect(
    `${process.env.BASE_PATH}/home?loginName=${loginName}&organization=${organization}`,
  );
}
