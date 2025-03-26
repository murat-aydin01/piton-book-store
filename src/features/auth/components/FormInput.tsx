import React from "react";

type Props = {
  type: string;
  name: string;
  
};
function FormInput({ type, name }: Props) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold text-xl"  htmlFor={name}>{name}</label>
      <input className="w-full h-14 p-4 rounded-sm bg-[#F4F4FF]" type={type} id={name} />
    </div>
  );
}

export default FormInput;
