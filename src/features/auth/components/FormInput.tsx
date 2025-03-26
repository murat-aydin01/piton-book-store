import React, { ComponentProps } from "react";
import {  UseFormRegisterReturn } from "react-hook-form";

type Props = {
  type: string;
  label: string;
  register: UseFormRegisterReturn<string>
  error: string | undefined
} & ComponentProps<"input">;
function FormInput({ type, label, register, error, ...rest }: Props) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold text-xl" htmlFor={label}>{label}</label>
      <input className="w-full h-14 p-4 rounded-sm bg-[#F4F4FF]" type={type} id={label} {...register} {...rest}/>
      TODO error mesajını göster
      {error && <span>{error}</span>}
    </div>
  );
}

export default FormInput;
