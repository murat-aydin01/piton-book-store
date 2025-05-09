"use client";

import React, { useState } from "react";
import FormInput from "./FormInput";
import ButtonAuth from "./ButtonAuth";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {loginSchema, RegisterSchema, registerSchema } from "../utils/authSchema";
import { z } from "zod";
import { login as apiLogin, register as apiRegister } from "@/app/services/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { showApiError } from "../utils/showApiErrors";

type Props = {type: "login" | "register"};

function AuthForm({ type }: Props) {
  const router = useRouter()
  const {handleLogin, } = useAuth()

  const [rememberMe, setRememberMe] = useState(false)
  const authSchema = type === "login" ? loginSchema : registerSchema;
  type AuthSchema = z.infer<typeof loginSchema> | z.infer<typeof registerSchema>;
  const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm<AuthSchema>({mode:"onChange", resolver:zodResolver(authSchema)});
  
  const onSubmit = async (data: AuthSchema) => {
    const toastId = toast.loading(type === "login" ? "Logging in..." : "Registering...");
    try {
      if (type === "login") {
        const token = await apiLogin(data).then(res => res.data.action_login.token);
        handleLogin(token, rememberMe);
        toast.success("Login successful!", { id: toastId });
      }
      if (type === "register") {
        const token = await apiRegister(data as RegisterSchema).then(res => res.data.action_register.token);
        handleLogin(token, rememberMe);
        toast.success("Registration successful!", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      showApiError(error);
      toast.dismiss(toastId);
    }
  };
  

  return (
    <div className="flex flex-col justify-between items-center my-10 md:my-20 h-full w-4/5 md:w-2/3">
      <div>
        <Image src="/Logo.png" alt="logo" width={120} height={78} />
      </div>

      <div className="flex flex-col w-full">
        <p className="font-semibold text-2xl">Welcome back!</p>
        <p className="font-bold text-3xl">Login to your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="new-off" className="flex flex-col w-full gap-y-20">
        <div className="flex flex-col  gap-y-4">
          <div className="flex flex-col gap-y-10">
            {type === "register" && <FormInput  type="text" label="Name" register={register("name")} error={'name' in errors ? errors.name?.message : undefined} />}
            <FormInput autoComplete="new-name" type="text" label="E-mail" register={register("email")} error={errors.email?.message} />
            <FormInput autoComplete="new-password" type="password" label="Password" register={register("password")} error={errors.password?.message} />
          </div>
          {type === "login" &&<label className="mt-2.5 text-[#6251DD] font-bold">
            <input className="mr-2 accent-[#6251DD] " type="checkbox" checked={rememberMe} onChange={(e)=>{setRememberMe(e.target.checked)}} />
            Remember me
          </label>}
        </div>
        <div className="flex flex-col gap-y-2">
          {type === "login" ? (
            <>
              <ButtonAuth disabled={isSubmitting}>Login</ButtonAuth>
              <ButtonAuth onClick={()=>{router.push("/register")}} type="button" variant="secondary">Register</ButtonAuth>
            </>
          ) : (
            <>
              <ButtonAuth disabled={isSubmitting}>Register</ButtonAuth>
              <ButtonAuth onClick={()=>{router.push("/login")}} type="button" variant="secondary">Login</ButtonAuth>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
