// components/ui/atoms/WISwitch.tsx
"use client";

import * as React from "react";

type WISwitchProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function WISwitch({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}: WISwitchProps) {
  const id = React.useId();

  return (
    <div className={`inline-flex items-center gap-3 ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm text-gray-700 select-none">
          {label}
        </label>
      )}

      {/* Visually-hidden native checkbox for accessibility */}
      <input
        id={id}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-checked={checked}
        role="switch"
      />

      {/* Track */}
      <label
        htmlFor={id}
        className={[
          "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-300",
          "ring-1 ring-inset",
          checked
            ? "bg-pink-700 ring-pink-700"
            : "bg-slate-100 ring-slate-200",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
      >
        {/* Thumb */}
        <span
          className={[
            "pointer-events-none block h-5 w-5 translate-x-0 rounded-full border bg-white shadow-sm transition-transform duration-300",
            checked ? "translate-x-5 border-pink-800" : "translate-x-0 border-slate-300",
          ].join(" ")}
        />
      </label>
    </div>
  );
}
