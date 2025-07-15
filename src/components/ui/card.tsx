import React from "react";

export function Card({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={"bg-white rounded-lg shadow " + (props.className || "")}>{children}</div>;
}

export function CardContent({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={"p-4 " + (props.className || "")}>{children}</div>;
}
