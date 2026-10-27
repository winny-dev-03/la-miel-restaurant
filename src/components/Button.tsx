import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

type Variant = "primary" | "light" | "dark" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#B65D3A] text-[#F7F4EC] border border-[#B65D3A] hover:bg-[#F7F4EC] hover:text-[#252A20] hover:border-[#F7F4EC]",
  light:
    "border border-[#F7F4EC]/60 text-[#F7F4EC] hover:bg-[#F7F4EC] hover:text-[#252A20]",
  dark: "border border-[#252A20] text-[#252A20] hover:bg-[#252A20] hover:text-[#F7F4EC]",
  ghost: "border border-transparent text-current underline decoration-[#B65D3A] decoration-2 underline-offset-8 hover:decoration-current",
};

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type Props =
  | (BaseProps & { to: string } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">)
  | (BaseProps & { to?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>);

export default function Button({ variant = "primary", className = "", children, to, ...rest }: Props) {
  const classes = `group inline-flex items-center justify-center gap-3 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9C6A5] ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}