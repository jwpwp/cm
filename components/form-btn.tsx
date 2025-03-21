"use client";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-[#F2F0EF] rounded-2xl w-1/2 h-10 disabled:bg-gray-300 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
