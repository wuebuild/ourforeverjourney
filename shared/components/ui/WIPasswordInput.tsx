"use client";

import * as React from "react";
import { WIInput, type InputProps } from "./WIInput";

export function WIPasswordInput({
  error,
  ...props
}: Omit<InputProps, "type" | "rightIcon">) {
  const [show, setShow] = React.useState(false);
  return (
    <WIInput
      {...props}
      type={show ? "text" : "password"}
      rightIcon={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      }
      error={error}
    />
  );
}
