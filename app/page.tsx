"use client";
import FormButton from "@/component/form-btn";
import FormInput from "@/component/form-input";
import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { handleForm } from "./action";
import { useActionState } from "react";

export default function Home() {
  const [state, action] = useActionState(handleForm, " " as any);
  console.log(state);
  return (
    <>
      <form
        action={action}
        className="w-full h-screen bg-[#F8F6F5] flex justify-center"
      >
        <div className="flex flex-col w-full gap-2 justify-center items-center">
          <div className="relative w-1/2">
            <EnvelopeIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <FormInput
              name="email"
              type="email"
              placeholder="Email"
              required
              errors={""}
            />
          </div>
          <div className="relative w-1/2">
            <UserIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <FormInput
              name="username"
              type="text"
              placeholder="Username"
              required
              errors={""}
            />
          </div>
          <div className="relative w-1/2">
            <KeyIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              required
              errors={state}
            />
          </div>
          <FormButton text="Log in" />
        </div>
      </form>
    </>
  );
}
