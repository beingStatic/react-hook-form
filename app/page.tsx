"use client";

import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@gmail.com",
    },
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try{
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    }
    catch(error){
      setError("root",{
        message : "Something went Wrong"
      })
    }
    
  };
  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("email", {
          required: "Email is required",
          validate: (value) => {
            if (!value.includes("@")) {
              return "Email must include @";
            }
            return true;
          },
        })}
        placeholder="Email"
        className="block  border p-2 w-1/2"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must have atleast 6 characters",
          },
        })}
        placeholder="Password"
        className="block p-2 border w-1/2"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <button disabled={isSubmitting} type="submit" className="border p-2 rounded-md">
        {isSubmitting ? "Loading" : "Submit"}
      </button>
      {errors.root && (
        <p className="text-red-500">{errors.root.message}</p>
      )}
      
    </form>
  );
}
