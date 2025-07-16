import {
  lowerCaseValidator,
  numberValidator,
  symbolValidator,
  upperCaseValidator,
} from "@/helpers/validators";
import { PasswordComplexitySettings } from "@zitadel/proto/zitadel/settings/v2/password_settings_pb";
import { PasswordCheckListItem } from "./password-check-list-item";

type TPasswordCheckListProps = {
  password: string;
  equals: boolean;
  passwordComplexitySettings: PasswordComplexitySettings;
};

export function PasswordCheckList({
  password,
  equals,
  passwordComplexitySettings,
}: TPasswordCheckListProps) {
  const hasMinLength = password?.length >= passwordComplexitySettings.minLength;
  const hasSymbol = symbolValidator(password);
  const hasNumber = numberValidator(password);
  const hasUppercase = upperCaseValidator(password);
  const hasLowercase = lowerCaseValidator(password);

  return (
    <div className="flex flex-col">
      <PasswordCheckListItem
        label="8+ characters long"
        checked={hasMinLength}
      />
      <PasswordCheckListItem
        label="Upper & lower case"
        checked={hasUppercase && hasLowercase}
      />
      <PasswordCheckListItem
        label="Numbers & special characters"
        checked={hasNumber && hasSymbol}
      />
      <PasswordCheckListItem label="Passwords match" checked={equals} />
    </div>
  );
}
