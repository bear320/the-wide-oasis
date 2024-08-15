import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCabin as duplicateCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useDuplicateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: duplicateCabin, isPending: isDuplicating } = useMutation({
    mutationFn: duplicateCabinApi,
    onSuccess: () => {
      toast.success("Cabin duplicated successfully!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { duplicateCabin, isDuplicating };
};
