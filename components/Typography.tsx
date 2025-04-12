import clsx from "clsx";
import React, { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
  weight?: "normal" | "medium" | "bold" | "semibold" | "light" | "extrabold";
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  size = "base",
  weight = "normal",
  className = "",
}) => {
  return <p className={clsx(`text-${size}`, `font-${weight}`, className)}>{children}</p>;
};

export default Typography;
