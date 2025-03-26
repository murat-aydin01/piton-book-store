"use client";

import React from "react";
import FormInput from "./components/FormInput";
import ButtonAuth from "./components/ButtonAuth";
import Image from "next/image";
import { useForm } from "react-hook-form";

type Props = {
  type: "login" | "register";
};

function AuthForm({ type }: Props) {
  const {register, handleSubmit, formState:{errors}} = useForm({mode:"onChange"});
  const onSubmit = () => {

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between items-center my-20 h-full  w-2/3">
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
            TODO: error props olarak gönder
            {type === "register" && <FormInput  type="text" label="Name" register={register("name",{minLength:3})} error={errors.name?.message as string} />}
            <FormInput  type="text" label="E-mail" register={register("email")} error={errors.email?.message as string} />
            <FormInput  type="password" label="Password" register={register("password")} error={errors.password?.message as string} />
          </div>
          {type === "register" &&<label className="text-[#6251DD] font-bold">
            <input className="mr-2 accent-[#6251DD] " type="checkbox" />
            Remember me
          </label>}
        </div>

        <div className="flex flex-col gap-y-2">
          {type === "login" ? (
            <>
              <ButtonAuth>Login</ButtonAuth>
              <ButtonAuth variant="secondary">Register</ButtonAuth>
            </>
          ) : (
            <>
              <ButtonAuth>Register</ButtonAuth>
              <ButtonAuth variant="secondary">Login</ButtonAuth>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default AuthForm;
