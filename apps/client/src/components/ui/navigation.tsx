"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  label: string;
  href: string;
}

export const NavigationLink = ({ label, href }: NavigationProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "px-3.5 py-2 text-sm inline-block transition-all rounded-sm rounded-b-none relative text-muted-foreground after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-primary outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        isActive
          ? "font-medium after:bg-primary text-foreground"
          : "after:bg-transparent"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
};
export const Navigation = ({ children }: { children: React.ReactNode }) => {
  return <nav className="border-b flex">{children}</nav>;
};
