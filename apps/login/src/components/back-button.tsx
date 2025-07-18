"use client";

import { Button } from "@kernel/ui";
import { useRouter } from "next/navigation";
import { Translated } from "./translated";

export function BackButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} type="button" variant={"outline"}>
      <Translated i18nKey="back" namespace="common" />
    </Button>
  );
}
