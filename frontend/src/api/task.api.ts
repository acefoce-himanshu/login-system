import client, { ApiResponse } from "./client";

export class TaskApi {
  static async create(body: CreateTaskBody) {
    const { data } = await client.post<CreateTaskResponse>("task", body);
    return data.task;
  }

  static async update(body: UpdateTaskBody) {
    const { data } = await client.patch<CreateTaskResponse>("task", body);
    return data.task;
  }

  static async list() {
    const { data } = await client.get<ListTaskResponse>("task/list");
    return data.tasks;
  }

  static async delete(taskId: string) {
    const { data } = await client.delete<ApiResponse>(`task/${taskId}`);
    return data;
  }
}

export type Task = {
  content: string;
  status: "ACTIVE" | "COMPLETED";
  _id: string;
};

type CreateTaskBody = {
  content: string;
};

type UpdateTaskBody = Partial<CreateTaskBody> & {
  id: string;
  status?: Task["status"];
};

type CreateTaskResponse = ApiResponse & {
  task: Task;
};

type ListTaskResponse = ApiResponse & {
  tasks: Task[];
};
