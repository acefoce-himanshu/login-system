import { TaskApi } from "@/api/task.api";
import { useQuery } from "@tanstack/react-query";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const tasks = await TaskApi.list();
      return tasks;
    },
  });
};
