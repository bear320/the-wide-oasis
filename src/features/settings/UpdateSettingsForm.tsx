import { useSettings } from "./useSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";
import { Setting } from "../../types";

function UpdateSettingsForm() {
  const { settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {}, isPending } =
    useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  if (isPending) return <Spinner />;

  const handleUpdate = (e: React.FocusEvent<HTMLInputElement>, field: Setting) => {
    const value = +e.target.value;
    if (!value) return;
    updateSetting({ [field]: value } as { [key in Setting]: number });
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, Setting.minBookingLength)}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, Setting.maxBookingLength)}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, Setting.maxGuestsPerBooking)}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, Setting.breakfastPrice)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
