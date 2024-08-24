import { useState } from "react";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function UpdateUserDataForm() {
  const { user } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(user?.user_metadata.fullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName)
      updateUser(
        { fullName, avatar },
        {
          onSuccess: handleReset,
        }
      );
  };

  const handleReset = () => {
    setFullName(user?.user_metadata.fullName);
    setAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user?.email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          id="fullName"
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput id="avatar" accept="image/*" disabled={isUpdating} onChange={(e) => setAvatar(e.target.files![0])} />
      </FormRow>

      <FormRow>
        <>
          <Button type="reset" $variation="secondary" disabled={isUpdating} onClick={handleReset}>
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
