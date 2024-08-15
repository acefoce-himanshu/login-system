import { AuthApi } from "@/api/auth.api";
import useForm from "@/hooks/useForm";
import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute, Link, useRouter } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginPage = () => {
  const router = useRouter();

  const { validate, components } = useForm(
    [
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
    ],
    schema,
    {
      email: "",
      password: "",
    }
  );

  const { mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      const res = await AuthApi.login(values);
      return res;
    },
    onSuccess() {
      console.log({ ok: "helki" });
      router.navigate({
        to: "/",
      });
    },
  });

  const handleClick = () => {
    const { success, data } = validate();
    if (!success) return;
    mutate(data);
  };

  return (
    <div className="flex min-h-screen justify-center items-center p-4">
      <div className="max-w-md w-full rounded-lg  mx-auto p-4 space-y-4 shadow bg-gray-100">
        {components.map((component) => {
          return (
            <div key={component.name}>
              <Input {...component} crossOrigin="" error={!!component.error} />
              {component.error && (
                <p className="text-[10px] text-red-500">{component.error}</p>
              )}
            </div>
          );
        })}

        <Button className="w-full" onClick={handleClick}>
          Login
        </Button>
        <Link to="/register" className="text-xs text-center block">
          I don't have an account
        </Link>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/login")({
  component: LoginPage,
});
