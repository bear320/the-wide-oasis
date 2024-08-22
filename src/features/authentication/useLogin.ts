import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Provided email or password are incorrect.");
    },
  });

  return {
    login,
    isLoading,
  };
};
