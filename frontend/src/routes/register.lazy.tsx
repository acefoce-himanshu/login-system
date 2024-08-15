import { AuthApi } from "@/api/auth.api";
import useForm from "@/hooks/useForm";
import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const RegisterPage = () => {
  const { validate, setError, components } = useForm(
    [
      {
        name: "name",
        placeholder: "John Doe",
        label: "Name",
        type: "text",
      },
      {
        name: "email",
        placeholder: "example@gmail.com",
        label: "Email",
        type: "email",
      },
      {
        name: "password",
        placeholder: "********",
        label: "Password",
        type: "password",
      },
      {
        name: "confirmPassword",
        placeholder: "********",
        label: "Confirm Password",
        type: "password",
      },
    ],
    schema,
    {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
    }
  );

  const { mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      const res = await AuthApi.register(values);
      return res;
    },
  });

  const handleClick = () => {
    const { success, data } = validate();
    if (!success) return;
    if (data.confirmPassword !== data.password) {
      setError("password", "Password did not match");
      return;
    }
    mutate(data);
  };

  return (
    <div className="flex min-h-screen justify-center items-center p-4">
      <div className="max-w-md w-full rounded-lg  mx-auto p-4 space-y-4 shadow bg-gray-100">
        {components.map((component) => {
          return (
            <div key={component.name}>
              <Input {...component} crossOrigin error={!!component.error} />
              {component.error && (
                <p className="text-[10px] text-red-500">{component.error}</p>
              )}
            </div>
          );
        })}

        <Button className="w-full" onClick={handleClick}>
          Register
        </Button>
        <Link to="/login" className="text-xs text-center block">
          I Have an account
        </Link>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/register")({
  component: RegisterPage,
});
