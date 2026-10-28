type IconProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
});

export function ArrowRight({ size = 20, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRight({ size = 20, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDown({ size = 20, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M12 4v16M6 14l6 6 6-6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUp({ size = 20, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M12 20V4M6 10l6-6 6 6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StoreIcon({ size = 24, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 10v9h16v-9M3 10l1.7-5.1A1.5 1.5 0 0 1 6.1 4h11.8a1.5 1.5 0 0 1 1.4 1L21 10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10a2.5 2.5 0 0 0 4.5 1.5A2.5 2.5 0 0 0 12 11a2.5 2.5 0 0 0 4.5.5A2.5 2.5 0 0 0 21 10M9 19v-4h6v4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TruckIcon({ size = 24, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M3 6h11v10H3zM14 9h4l3 3v4h-7z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

export function CardIcon({ size = 24, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M3 10h18M7 15h3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LeafIcon({ size = 24, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M4 20c3-6 7-9 12-11"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PlusIcon({ size = 18, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M12 4v16M4 12h16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MinusIcon({ size = 18, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 12h16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon({ size = 20, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M4 8h16M4 16h16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon({ size = 20, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="m5 5 14 14M19 5 5 19"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckIcon({ size = 18, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="m4 12 5 5L20 6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.23 3.74.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className, strokeWidth = 1.5 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        fill="currentColor"
        d="M14 8.5V6.8c0-.8.5-1 1-1h2.5V2.1L14.1 2C10.8 2 10 4.3 10 5.8v2.7H7.5V12H10v10h4V12h2.7l.4-3.5H14Z"
      />
    </svg>
  );
}

export function PinterestIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        fill="currentColor"
        d="M12.1 2C6.7 2 4 5.7 4 8.9c0 1.7.9 3.8 2.4 4.5.2.1.4 0 .4-.2l.4-1.6c0-.2 0-.3-.1-.4-.6-.7-.9-1.6-.9-2.6 0-2.7 2-5.1 5.7-5.1 3.1 0 5.1 1.9 5.1 4.5 0 3.4-1.5 6.2-3.8 6.2-1.2 0-2.1-1-1.8-2.3l.7-2.8c.2-.9-.1-1.7-1.1-1.7-.9 0-1.7.9-1.7 2.2 0 .8.3 1.3.3 1.3l-1.1 4.7c-.3 1.3-.1 3-.1 3.1 0 .1.2.2.3.1.1-.1 1.5-1.9 1.9-3.1l.6-2.3c.4.7 1.5 1.3 2.7 1.3 3.5 0 5.9-3.2 5.9-7.5C20 4.6 16.9 2 12.1 2Z"
      />
    </svg>
  );
}
