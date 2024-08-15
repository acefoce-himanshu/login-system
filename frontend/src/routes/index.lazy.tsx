import { AuthApi } from "@/api/auth.api";
import { TaskApi } from "@/api/task.api";
import TaskCard from "@/components/TaskCard";
import { UserEditButton } from "@/components/UserEditModal";
import { useInfo } from "@/hooks/userInfo";
import { useTasks } from "@/hooks/useTask";
import { Button, Input, Spinner } from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { MdPowerSettingsNew } from "react-icons/md";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, isLoading } = useInfo();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await AuthApi.logout();
    },
    onSuccess() {
      router.navigate({
        to: "/login",
      });
      queryClient.removeQueries({
        queryKey: ["user-info"],
      });
    },
  });

  const { data: tasks } = useTasks();

  const createTask = useMutation({
    mutationFn: async (content: string) => {
      const task = await TaskApi.create({
        content,
      });
      return task;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      setText("");
    },
  });

  const addTask = () => {
    createTask.mutate(text);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h1 className=" text-3xl font-medium">Welcome {data?.name}!</h1>
          <UserEditButton />
        </div>
        <Button onClick={() => logout()} size="sm">
          <MdPowerSettingsNew size={18} />
        </Button>
      </div>
      <div className="max-w-xl flex gap-2">
        <Input
          crossOrigin=""
          onChange={(e) => setText(e.target.value)}
          value={text}
          label="Add task"
          placeholder="I have to buy a pen..."
        />
        <Button
          variant="outlined"
          disabled={!text}
          onClick={addTask}
          loading={createTask.isPending}
        >
          Add
        </Button>
      </div>
      <ul className="mt-4">
        {tasks?.map((task) => {
          return <TaskCard task={task} key={task._id} />;
        })}
      </ul>
    </div>
  );
}
