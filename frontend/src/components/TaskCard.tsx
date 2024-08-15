import { Task, TaskApi } from "@/api/task.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type TaskCardProps = {
  task: Task;
};

function TaskCard({ task }: TaskCardProps) {
  const isCompleted = task.status === "COMPLETED";
  const queryClient = useQueryClient();

  const toggleStatus = useMutation({
    mutationFn: async (taskId: string) => {
      const task = await TaskApi.update({
        id: taskId,
        status: isCompleted ? "ACTIVE" : "COMPLETED",
      });
      return task;
    },
    onSuccess(task) {
      queryClient.setQueryData<Task[]>(["tasks"], (prev = []) => {
        const arr = [...prev];
        const index = arr.findIndex((curr) => curr._id === task._id);
        arr.splice(index, 1, task);
        return arr;
      });
    },
  });

  return (
    <li
      className={`list-disc flex gap-2 ${isCompleted ? "line-through" : ""}`}
      key={task._id}
    >
      <input
        disabled={toggleStatus.isPending}
        type="checkbox"
        checked={isCompleted}
        onChange={() => toggleStatus.mutate(task._id)}
      />
      <p>{task.content}</p>
    </li>
  );
}

export default TaskCard;
