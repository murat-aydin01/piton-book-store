import React from "react";
import FormInput from "../components/FormInput";
import ButtonAuth from "../components/ButtonAuth";
import Image from "next/image";

function LoginForm() {
  return (
    <div className="flex flex-col justify-between items-center my-20 h-full  w-[400px]">
      <div>
        <Image src="/Logo.png" alt="logo" width={120} height={78} />
      </div>

      <div className="flex flex-col w-full">
        <p className="font-semibold text-2xl">Welcome back!</p>
        <p className="font-bold text-3xl">Login to your account</p>
      </div>
      <div className="flex flex-col gap-y-20">
        <div className="flex flex-col  gap-2">
          <div className="flex flex-col gap-y-10">
            <FormInput id="email" type="text" />
            <FormInput id="password" type="password" />
          </div>
          <label><input type="checkbox" />Remember me</label>
        </div>

        <div className="flex flex-col gap-y-2">
          <ButtonAuth variant="secondary">Login</ButtonAuth>
          <ButtonAuth>Register</ButtonAuth>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
