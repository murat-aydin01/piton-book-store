import React from "react";
import FormInput from "../components/FormInput";
import ButtonAuth from "../components/ButtonAuth";
import Image from "next/image";

function LoginForm() {
  return (
    <form className="flex flex-col justify-between items-center my-20 h-full  w-2/3">
      <div>
        <Image src="/Logo.png" alt="logo" width={120} height={78} />
      </div>

      <div className="flex flex-col w-full">
        <p className="font-semibold text-2xl">Welcome back!</p>
        <p className="font-bold text-3xl">Login to your account</p>
      </div>
      <div className="flex flex-col w-full gap-y-20">
        <div className="flex flex-col  gap-y-2">
          <div className="flex flex-col gap-y-10">
            <FormInput name="E-mail" type="text" />
            <FormInput name="Password" type="password" />
          </div>
          <label className="text-[#6251DD] font-bold"><input className="mr-2 accent-[#6251DD] " type="checkbox" />Remember me</label>
        </div>

        <div className="flex flex-col gap-y-2">
          <ButtonAuth>Login</ButtonAuth>
          <ButtonAuth variant="secondary">Register</ButtonAuth>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
