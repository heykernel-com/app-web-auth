import { DynamicTheme } from "@/components/dynamic-theme";
import { SignInWithIdp } from "@/components/sign-in-with-idp";
import { Translated } from "@/components/translated";
import { UsernameForm } from "@/components/username-form";
import { getServiceUrlFromHeaders } from "@/lib/service-url";
import {
  getActiveIdentityProviders,
  getBrandingSettings,
  getDefaultOrg,
  getLoginSettings,
} from "@/lib/zitadel";
import { Separator } from "@kernel/ui/components/separator";
import { headers } from "next/headers";

export default async function Page(props: {
  searchParams: Promise<Record<string | number | symbol, string | undefined>>;
}) {
  const searchParams = await props.searchParams;

  const loginName = searchParams?.loginName;
  const requestId = searchParams?.requestId;
  const organization = searchParams?.organization;
  const suffix = searchParams?.suffix;
  const submit: boolean = searchParams?.submit === "true";

  const _headers = await headers();
  const { serviceUrl } = getServiceUrlFromHeaders(_headers);

  let defaultOrganization;
  if (!organization) {
    const org = await getDefaultOrg({
      serviceUrl,
    }).catch((err) => {
      console.debug("error", err);
      return undefined;
    });
    if (org) {
      defaultOrganization = org.id;
    }
  } else {
    defaultOrganization = organization;
  }

  const loginSettings = await getLoginSettings({
    serviceUrl,
    organization: organization ?? defaultOrganization,
  }).catch((err) => {
    console.debug("error", err);
    return undefined;
  });

  const contextLoginSettings = await getLoginSettings({
    serviceUrl,
    organization,
  }).catch((err) => {
    console.debug("error", err);
    return undefined;
  });

  const identityProviders = await getActiveIdentityProviders({
    serviceUrl,
    orgId: organization ?? defaultOrganization,
  })
    .then((resp) => {
      return resp.identityProviders;
    })
    .catch((err) => {
      console.debug("error", err);
      return undefined;
    });

  const branding = await getBrandingSettings({
    serviceUrl,
    organization: organization ?? defaultOrganization,
  }).catch((err) => {
    console.debug("error", err);
    return undefined;
  });

  return (
    <DynamicTheme branding={branding}>
      <div className="flex flex-col items-center space-y-6 w-92 p-6">
        <h1 className="text-primary text-2xl font-semibold leading-normal">
          <Translated i18nKey="title" namespace="loginname" />
        </h1>

        <UsernameForm
          loginName={loginName}
          requestId={requestId}
          organization={organization} // stick to "organization" as we still want to do user discovery based on the searchParams not the default organization, later the organization is determined by the found user
          loginSettings={contextLoginSettings}
          suffix={suffix}
          submit={submit}
          allowRegister={!!loginSettings?.allowRegister}
        ></UsernameForm>

        {identityProviders && loginSettings?.allowExternalIdp && (
          <div className="w-full pt-6 pb-4">
            <SignInWithIdp
              identityProviders={identityProviders}
              requestId={requestId}
              organization={organization}
            ></SignInWithIdp>
          </div>
        )}

        {/* Term of use and privacy policy */}
        <div className="flex flex-col gap-6 w-full">
          <div className="w-full mb-2">
            <Separator />
          </div>
          <p className="text-sm text-center leading-normal text-primary/75 px-4">
            By signing in you are agreeing to the <br />
            <span className="font-medium text-primary">Terms of Use</span> and
            &nbsp;
            <span className="font-medium text-primary">Privacy Policy</span>.
          </p>
          <p className="text-sm text-center leading-normal text-primary/75">
            Don’t have an account?{" "}
            <span className="font-medium text-primary">Try Kernel</span> today!
          </p>
        </div>
      </div>
    </DynamicTheme>
  );
}
