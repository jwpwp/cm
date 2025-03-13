"use server";

export const handleForm = async (prevState: any, formdata: FormData) => {
  const password = formdata.get("password");
  if (password !== "12345") {
    return ["Wrong password"];
  }

  return;
};
