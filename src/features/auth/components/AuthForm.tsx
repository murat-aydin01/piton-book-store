"use client";

import React from "react";
import FormInput from "./FormInput";
import ButtonAuth from "./ButtonAuth";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {loginSchema, registerSchema } from "../utils/authSchema";
import { z } from "zod";
type Props = {
  type: "login" | "register";
};

function AuthForm({ type }: Props) {

  const authSchema = type === "login" ? loginSchema : registerSchema;
  type AuthSchema = z.infer<typeof loginSchema> | z.infer<typeof registerSchema>;


  const {register, handleSubmit, formState:{errors}} = useForm<AuthSchema>({mode:"onChange", resolver:zodResolver(authSchema)});

  const onSubmit = (data: AuthSchema) => {
    console.log(data)
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
        <div className="flex flex-col  gap-y-4">
          <div className="flex flex-col gap-y-10">
            {type === "register" && <FormInput  type="text" label="Name" register={register("name")} error={errors.name?.message} />}
            <FormInput  type="text" label="E-mail" register={register("email")} error={errors.email?.message} />
            <FormInput  type="password" label="Password" register={register("password")} error={errors.password?.message} />
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
              <ButtonAuth type="button" variant="secondary">Register</ButtonAuth>
            </>
          ) : (
            <>
              <ButtonAuth>Register</ButtonAuth>
              <ButtonAuth type="button" variant="secondary">Login</ButtonAuth>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default AuthForm;
