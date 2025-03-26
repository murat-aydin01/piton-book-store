import React from "react";

type Props = {
  type: string;
  id: string;
  
};
function FormInput({ type, id }: Props) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold text-xl"  htmlFor={id}>e-mail</label>
      <input className="w-full h-14 p-4 rounded-sm bg-[#F4F4FF]" type={type} id={id} />
    </div>
  );
}

export default FormInput;
