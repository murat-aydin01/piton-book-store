import React from "react";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};
function ButtonAuth({ children, variant = "primary" }: Props) {
  const baseClasses = "py-3 w-full font-semibold rounded-sm text-2xl";
  const secondaryClasses = "text-white bg-[#EF6B4A]";
  const primaryClasses = "text-[#6251DD] border border-[#6251DD]";
  return <button className={`${baseClasses} ${variant==="primary"||primaryClasses} ${variant==="secondary"||secondaryClasses}`}>{children}</button>;
}

export default ButtonAuth;
