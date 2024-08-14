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
