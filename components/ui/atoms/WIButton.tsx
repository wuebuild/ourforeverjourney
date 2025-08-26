// components/atoms/Button.tsx
import { cn } from "@/lib/utils"; // optional helper for merging classes

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  className?: string;
};

export default function WIButton({ children, variant = "primary", href = "#", className }: ButtonProps) {
  const base = "px-6 py-3 rounded-2xl font-medium transition";
  const styles = {
    primary: "bg-pink-600 text-white shadow hover:bg-pink-700",
    secondary: "border border-pink-600 text-pink-600 hover:bg-pink-50",
  };

  return (
    <a href={href} className={cn(base, styles[variant], className)}>
      {children}
    </a>
  );
}