export interface IBooking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
}

export interface IBookingProps
  extends Omit<
    IBooking,
    | "cabinPrice"
    | "extrasPrice"
    | "hasBreakfast"
    | "isPaid"
    | "observations"
    | "cabinId"
    | "guestId"
  > {
  guests: { fullName: string; email: string };
  cabins: { name: string };
}

export interface ICabin {
  id: number;
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: File | string;
  created_at: string;
}

export type ICabinMutation = Omit<ICabin, "id" | "created_at">;

export enum Setting {
  minBookingLength = "minBookingLength",
  maxBookingLength = "maxBookingLength",
  maxGuestsPerBooking = "maxGuestsPerBooking",
  breakfastPrice = "breakfastPrice",
}
