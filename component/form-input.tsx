interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  name: string;
  errors?: string[];
}

export default function FormInput({
  type,
  placeholder,
  required,
  name,
  errors = [],
}: FormInputProps) {
  return (
    <>
      <input
        className="bg-transparent rounded-2xl w-full h-10 border-2 border-[#F2F0EF] focus:ring-3 focus:ring-offset-2 focus:ring-gray-400 focus:outline-none pl-10"
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
      />
      {errors?.map((error, index) => (
        <p key={index} className="text-red-500 font-medium">
          {error}
        </p>
      ))}
    </>
  );
}
