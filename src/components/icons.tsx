import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps, viewBox: string) {
  return { width: size, height: size, viewBox, fill: "none", "aria-hidden": true as const, ...props };
}

export function IconStar(props: IconProps) {
  return (
    <svg {...base(props, "0 0 16 16")}>
      <path
        d="M8 1.33333L10.06 5.50667L14.6667 6.18L11.3333 9.42667L12.12 14.0133L8 11.8467L3.88 14.0133L4.66667 9.42667L1.33333 6.18L5.94 5.50667L8 1.33333Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base(props, "0 0 16 16")}>
      <path
        d="M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 4V8L10.6667 9.33333"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base(props, "0 0 20 20")}>
      <path
        d="M16.6667 8.33333C16.6667 13.3333 10 18.3333 10 18.3333C10 18.3333 3.33333 13.3333 3.33333 8.33333C3.33333 6.56522 4.03571 4.86953 5.28595 3.61929C6.5362 2.36905 8.23189 1.66667 10 1.66667C11.7681 1.66667 13.4638 2.36905 14.714 3.61929C15.9643 4.86953 16.6667 6.56522 16.6667 8.33333Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 8.33333C12.5 9.71405 11.3807 10.8333 10 10.8333C8.61929 10.8333 7.5 9.71405 7.5 8.33333C7.5 6.95262 8.61929 5.83333 10 5.83333C11.3807 5.83333 12.5 6.95262 12.5 8.33333Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base(props, "0 0 20 20")}>
      <path
        d="M4.16667 3.33333H15.8333C16.7538 3.33333 17.5 4.07953 17.5 5V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V5C2.5 4.07953 3.24619 3.33333 4.16667 3.33333Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.3333 1.66667V5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" />
      <path d="M6.66667 1.66667V5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" />
      <path d="M2.5 8.33333H17.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" />
    </svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <svg {...base(props, "0 0 20 20")}>
      <path
        d="M6.58333 16.6667C8.17381 17.4825 10.0034 17.7035 11.7424 17.2898C13.4814 16.8761 15.0155 15.8549 16.0681 14.4101C17.1208 12.9654 17.6228 11.1923 17.4838 9.41013C17.3448 7.62801 16.5738 5.95414 15.3098 4.69016C14.0459 3.42618 12.372 2.65521 10.5899 2.51618C8.80774 2.37715 7.03456 2.87921 5.58985 3.93187C4.14514 4.98454 3.12391 6.51859 2.71019 8.25759C2.29646 9.9966 2.51745 11.8262 3.33333 13.4167L1.66667 18.3333L6.58333 16.6667Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base(props, "0 0 20 20")}>
      <path
        d="M18.3333 14.1V16.6C18.3343 16.8321 18.2867 17.0618 18.1938 17.2745C18.1008 17.4871 17.9644 17.678 17.7934 17.8349C17.6224 17.9918 17.4205 18.1112 17.2006 18.1856C16.9808 18.2599 16.7478 18.2876 16.5167 18.2667C13.9524 17.988 11.4892 17.1118 9.325 15.7083C7.31152 14.4289 5.60445 12.7218 4.325 10.7083C2.91665 8.53434 2.0402 6.05916 1.76667 3.48333C1.74584 3.25289 1.77323 3.02063 1.84708 2.80135C1.92094 2.58207 2.03964 2.38057 2.19564 2.20968C2.35163 2.03879 2.5415 1.90226 2.75316 1.80877C2.96481 1.71528 3.19362 1.66688 3.425 1.66667H5.925C6.32942 1.66269 6.72149 1.8059 7.02813 2.06961C7.33478 2.33332 7.53506 2.69954 7.59167 3.1C7.69719 3.90006 7.89287 4.68561 8.175 5.44167C8.28712 5.73994 8.31139 6.0641 8.24492 6.37573C8.17846 6.68737 8.02405 6.97343 7.8 7.2L6.74167 8.25833C7.92796 10.3446 9.65538 12.072 11.7417 13.2583L12.8 12.2C13.0266 11.9759 13.3126 11.8215 13.6243 11.7551C13.9359 11.6886 14.2601 11.7129 14.5583 11.825C15.3144 12.1071 16.0999 12.3028 16.9 12.4083C17.3048 12.4654 17.6745 12.6693 17.9388 12.9812C18.2031 13.2932 18.3435 13.6913 18.3333 14.1Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props, "0 0 20 20")}>
      <path
        d="M16.6667 5L7.5 14.1667L3.33333 10"
        stroke="currentColor"
        strokeWidth="2.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <svg {...base(props, "0 0 20 20")}>
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <svg {...base(props, "0 0 20 20")}>
      <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base(props, "0 0 20 20")}>
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconAlert(props: IconProps) {
  return (
    <svg {...base({ size: 16, ...props }, "0 0 16 16")}>
      <path
        d="M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 5.33333V8" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" />
      <path d="M8 10.6667H8.00667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" />
    </svg>
  );
}
