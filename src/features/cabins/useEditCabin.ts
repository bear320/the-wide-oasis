import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin as editCabinApi } from "../../services/apiCabins";
import { ICabinMutation } from "../../types";
import toast from "react-hot-toast";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({
      id,
      cabinData,
    }: {
      id: number;
      cabinData: ICabinMutation;
    }) => editCabinApi(id, cabinData),
    onSuccess: () => {
      toast.success("Cabin edited successfully!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditing };
};
