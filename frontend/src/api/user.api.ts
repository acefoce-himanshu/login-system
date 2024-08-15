import client, { ApiResponse } from "./client";

export class UserApi {
  static async info() {
    const { data } = await client.get<InfoResponse>("user/info");
    return data.user;
  }

  static async upate(body: UserUpdateBody) {
    const { data } = await client.patch<UpdateResponse>("user", body);
    return data.user;
  }
}

export type User = {
  email: string;
  name: string;
  status: string;
};

type InfoResponse = ApiResponse<{
  user: User;
}>;

type UpdateResponse = ApiResponse & {
  user: User;
};

type UserUpdateBody = {
  email?: string;
  name?: string;
};
