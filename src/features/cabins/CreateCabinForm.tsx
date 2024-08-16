import { FieldValues, useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import { ICabin, ICabinMutation } from "../../types";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({
  cabinToEdit = {},
  onCloseModal,
}: {
  cabinToEdit?: Partial<ICabin>;
  onCloseModal?: () => void;
}) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, getValues, formState, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const onSubmit = (data: FieldValues) => {
    const cabinData: ICabinMutation = {
      name: data.name,
      maxCapacity: +data.maxCapacity,
      regularPrice: +data.regularPrice,
      discount: +data.discount,
      description: data.description,
      image: typeof data.image === "string" ? data.image : data.image[0],
    };

    if (editId && isEditSession)
      editCabin(
        { cabinData, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(cabinData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
  };

  // const onError = (errors: unknown) => {
  //   console.error(errors);
  // };

  return (
    <Form type={onCloseModal ? "modal" : "regular"} onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message?.toString() ?? ""}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "Please enter the cabin name" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message?.toString() ?? ""}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "Please enter the maximum capacity",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message?.toString() ?? ""}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "Please enter the regular price",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message?.toString() ?? ""}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "Please enter the discount",
            validate: (value: number | undefined) =>
              value === undefined ||
              value <= getValues().regularPrice! ||
              "Discount should be less than or equal to regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message?.toString() ?? ""}>
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "Please enter the description",
          })}
        />
      </FormRow>

      <FormRow label="Cabin image" error={errors?.image?.message?.toString() ?? ""}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Please upload an image",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button type="reset" $variation="secondary" onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
