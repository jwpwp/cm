import FormButton from "@/component/form-btn";
import FormInput from "@/component/form-input";
import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { useFormState } from "react-dom";

export default function Home() {
  const handleForm = async (formdata: FormData) => {
    "use server";
    console.log(
      formdata.get("email"),
      formdata.get("username"),
      formdata.get("password")
    );
  };

  return (
    <>
      <form
        action={handleForm}
        className="w-full h-screen bg-[#F8F6F5] flex justify-center"
      >
        <div className="flex flex-col w-full gap-2 justify-center items-center">
          <div className="relative w-1/2">
            <EnvelopeIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <FormInput name="email" type="email" placeholder="Email" required />
          </div>
          <div className="relative w-1/2">
            <UserIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <FormInput
              name="username"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="relative w-1/2">
            <KeyIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <FormButton text="Log in" />
        </div>
      </form>
    </>
  );
}
