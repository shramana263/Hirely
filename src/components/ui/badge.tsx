import React from "react";

export function Badge({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} className={"inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold " + (props.className || "")}>{children}</span>;
}
