import React, { ComponentProps } from "react";
import {  UseFormRegisterReturn } from "react-hook-form";

type Props = {
  type: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: string
} & ComponentProps<"input">;
function FormInput({ type, label, register, error, ...rest }: Props) {
  return (
    <div className="flex flex-col relative">
      <label className="font-semibold text-xl" htmlFor={label}>{label}</label>
      <input className="w-full h-14 p-4 rounded-sm bg-[#F4F4FF]" type={type} id={label} {...register} {...rest}/>
      {error && <span className="text-red-600 absolute w-full -bottom-6 truncate">{error}</span>}
    </div>
  );
}

export default FormInput;
