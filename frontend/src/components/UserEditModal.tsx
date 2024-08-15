import { User, UserApi } from "@/api/user.api";
import useForm from "@/hooks/useForm";
import { useInfo } from "@/hooks/userInfo";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

type UserEditModalProps = {
  onHide: () => void;
};

function UserEditModal({ onHide }: UserEditModalProps) {
  const { data } = useInfo();
  const queryClient = useQueryClient();
  const { components, validate } = useForm(
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
    ],
    schema,
    {
      email: data?.email,
      name: data?.name,
    }
  );

  const { mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof schema>) => {
      const user = await UserApi.upate(values);
      return user;
    },
    onSuccess(user) {
      queryClient.setQueryData<User>(["user"], (prev) => ({
        ...prev,
        ...user,
      }));
      onHide();
    },
  });

  const handleSubmit = () => {
    const { success, data } = validate();
    if (!success) return;
    mutate(data);
  };

  return (
    <Dialog open handler={() => onHide()}>
      <DialogHeader>User Info</DialogHeader>
      <DialogBody className="space-y-4">
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
      </DialogBody>
      <DialogFooter>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogFooter>
    </Dialog>
  );
}

export const UserEditButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outlined" size="sm">
        <LuPencil />
      </Button>
      {isOpen && <UserEditModal onHide={() => setIsOpen(false)} />}
    </>
  );
};

export default UserEditModal;
