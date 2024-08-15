import client from "./client";

export class AuthApi {
  static async register(body: RegisterBody) {
    const { data } = await client.post("/auth/register", body);
    return data;
  }

  static async login(body: LoginBody) {
    const { data } = await client.post("/auth/login", body);
    return data;
  }

  static async logout() {
    await client.get("/auth/logout");
  }
}

type RegisterBody = {
  name: string;
  email: string;
  password: string;
};

type LoginBody = {
  email: string;
  password: string;
};
