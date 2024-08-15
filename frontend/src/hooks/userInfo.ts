import { UserApi } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export const useInfo = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await UserApi.info();
      return user;
    },
    refetchOnMount: false,
  });
};
