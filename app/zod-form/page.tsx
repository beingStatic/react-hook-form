"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {z} from "zod";

const schema = z.object({
  email:z.string().email(),
  password: z.string().min(8)
})

type FormFields = z.infer<typeof schema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({resolver: zodResolver(schema)});
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try{
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
        {...register("email")}
        placeholder="Email"
        className="block  border p-2 w-1/2"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        type="password"
        {...register("password")}
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
