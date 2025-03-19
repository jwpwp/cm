"use client";
import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/16/solid";
import { logIn } from "./actions";
import { useActionState } from "react";

export default function Home() {
  const [state, action] = useActionState(logIn, null);

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
              errors={state?.fieldErrors.email}
            />
          </div>

          <div className="relative w-1/2">
            <KeyIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              required
              errors={state?.fieldErrors.password}
            />
          </div>
          <FormButton text="Log in" />
        </div>
      </form>
    </>
  );
}
