"use client";

import { completeDeviceAuthorization } from "@/lib/server/device";
import { Button } from "@kernel/ui";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert } from "./alert";
import { Spinner } from "./spinner";
import { Translated } from "./translated";

export function ConsentScreen({
  scope,
  nextUrl,
  deviceAuthorizationRequestId,
  appName,
}: {
  scope?: string[];
  nextUrl: string;
  deviceAuthorizationRequestId: string;
  appName?: string;
}) {
  const t = useTranslations();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  async function denyDeviceAuth() {
    setLoading(true);
    const response = await completeDeviceAuthorization(
      deviceAuthorizationRequestId,
    )
      .catch(() => {
        setError("Could not register user");
        return;
      })
      .finally(() => {
        setLoading(false);
      });

    if (response) {
      return router.push("/device");
    }
  }

  const scopes = scope?.filter((s) => !!s);

  return (
    <div className="pt-4 w-full flex flex-col items-center space-y-4">
      <ul className="list-disc space-y-2 w-full">
        {scopes?.length === 0 && (
          <span className="w-full text-sm flex flex-row items-center bg-background-light-400 dark:bg-background-dark-400  border border-divider-light py-2 px-4 rounded-md transition-all">
            <Translated i18nKey="device.scope.openid" namespace="device" />
          </span>
        )}
        {scopes?.map((s) => {
          const translationKey = `device.scope.${s}`;
          const description = t(translationKey, null);

          // Check if the key itself is returned and provide a fallback
          const resolvedDescription =
            description === translationKey ? "" : description;

          return (
            <li
              key={s}
              className="w-full text-sm flex flex-row items-center bg-background-light-400 dark:bg-background-dark-400  border border-divider-light py-2 px-4 rounded-md transition-all"
            >
              <span>{resolvedDescription}</span>
            </li>
          );
        })}
      </ul>

      <p className="ztdl-p text-xs text-left">
        <Translated
          i18nKey="request.disclaimer"
          namespace="device"
          data={{ appName: appName }}
        />
      </p>

      {error && (
        <div className="py-4">
          <Alert>{error}</Alert>
        </div>
      )}

      <div className="mt-4 flex w-full flex-row items-center">
        <Button
          onClick={() => {
            denyDeviceAuth();
          }}
          variant={"outline"}
          data-testid="deny-button"
        >
          {loading && <Spinner className="h-5 w-5 mr-2" />}
          <Translated i18nKey="device.request.deny" namespace="device" />
        </Button>
        <span className="flex-grow"></span>

        <Link href={nextUrl}>
          <Button
            data-testid="submit-button"
            type="submit"
            className="self-end"
          >
            <Translated i18nKey="device.request.submit" namespace="device" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
