import { Alert, AlertType } from "@/components/alert";
import { DynamicTheme } from "@/components/dynamic-theme";
import { InviteForm } from "@/components/invite-form";
import { getServiceUrlFromHeaders } from "@/lib/service";
import {
  getBrandingSettings,
  getDefaultOrg,
  getLoginSettings,
  getPasswordComplexitySettings,
} from "@/lib/zitadel";
import { getLocale, getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export default async function Page(props: {
  searchParams: Promise<Record<string | number | symbol, string | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const locale = getLocale();
  const t = await getTranslations({ locale, namespace: "invite" });

  let { firstname, lastname, email, organization } = searchParams;

  const _headers = await headers();
  const { serviceUrl } = getServiceUrlFromHeaders(_headers);

  if (!organization) {
    const org = await getDefaultOrg({ serviceUrl });
    if (!org) {
      throw new Error("No default organization found");
    }

    organization = org.id;
  }

  const loginSettings = await getLoginSettings({
    serviceUrl,
    organization,
  });

  const passwordComplexitySettings = await getPasswordComplexitySettings({
    serviceUrl,
    organization,
  });

  const branding = await getBrandingSettings({
    serviceUrl,
    organization,
  });

  return (
    <DynamicTheme branding={branding}>
      <div className="flex flex-col items-center space-y-4">
        <h1>{t("title")}</h1>
        <p className="ztdl-p">{t("description")}</p>

        {!loginSettings?.allowRegister ? (
          <Alert type={AlertType.ALERT}>{t("notAllowed")}</Alert>
        ) : (
          <Alert type={AlertType.INFO}>{t("info")}</Alert>
        )}

        {passwordComplexitySettings && loginSettings?.allowRegister && (
          <InviteForm
            organization={organization}
            firstname={firstname}
            lastname={lastname}
            email={email}
          ></InviteForm>
        )}
      </div>
    </DynamicTheme>
  );
}
