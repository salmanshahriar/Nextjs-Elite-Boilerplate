import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof Link> & {
  variant?: "default" | "underlined";
};

const TextLink = ({ className = "", children, variant = "default", ...props }: LinkProps) => {
  return (
    <Link
      className={cn(
        "text-foreground",
        variant === "default" && "no-underline",
        variant === "underlined" && "text-foreground/50 underline",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default TextLink;
