"use client";

import * as React from "react";
import clsx from "clsx";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  helperText?: string;
  error?: string | boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  containerClassName?: string;
};

const sizes = {
  sm: "h-9 text-sm px-3",
  md: "h-11 text-base px-3.5",
  lg: "h-12 text-base px-4",
};

export const WIInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      size = "md",
      className,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const hasError = !!error;

    return (
      <div className={clsx("w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <div
          className={clsx(
            "relative flex items-center rounded-xl border bg-white",
            hasError
              ? "border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-500/30"
              : "border-gray-300 focus-within:border-indigo-500 focus-within:ring-indigo-500/30",
            "focus-within:ring-4 transition-shadow"
          )}
        >
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 text-gray-400">
              {leftIcon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            className={clsx(
              "peer w-full rounded-xl bg-transparent outline-none placeholder:text-gray-400",
              sizes[size],
              leftIcon && "pl-9",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 text-gray-500">{rightIcon}</span>
          )}
        </div>

        {hasError ? (
          <p className="mt-1 text-xs text-rose-600">
            {typeof error === "string" ? error : "Invalid value"}
          </p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

WIInput.displayName = "Input";
