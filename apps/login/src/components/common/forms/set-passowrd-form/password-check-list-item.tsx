type TPasswordCheckListItemProps = {
  checked: boolean;
  label: string;
};

const unCheckedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
  >
    <g opacity="0.8">
      <path
        d="M9 17C13.1421 17 16.5 13.6421 16.5 9.5C16.5 5.35786 13.1421 2 9 2C4.85786 2 1.5 5.35786 1.5 9.5C1.5 13.6421 4.85786 17 9 17Z"
        stroke="#171036"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const CheckedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
  >
    <g opacity="0.8">
      <path
        d="M9 17C13.1421 17 16.5 13.6421 16.5 9.5C16.5 5.35786 13.1421 2 9 2C4.85786 2 1.5 5.35786 1.5 9.5C1.5 13.6421 4.85786 17 9 17Z"
        fill="#171036"
      />
      <path
        d="M6.75 9.5L8.25 11C9.42157 9.82843 10.0784 9.17157 11.25 8"
        fill="#171036"
      />
      <path
        d="M6.75 9.5L8.25 11C9.42157 9.82843 10.0784 9.17157 11.25 8M16.5 9.5C16.5 13.6421 13.1421 17 9 17C4.85786 17 1.5 13.6421 1.5 9.5C1.5 5.35786 4.85786 2 9 2C13.1421 2 16.5 5.35786 16.5 9.5Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
  </svg>
);

export function PasswordCheckListItem({
  checked,
  label,
}: TPasswordCheckListItemProps) {
  return (
    <div className="flex justify-between items-center pr-3">
      <span className="text-primary/50 text-sm leading-5">{label}</span>
      <span className="size-[18px]">
        {checked ? CheckedIcon : unCheckedIcon}
      </span>
    </div>
  );
}
