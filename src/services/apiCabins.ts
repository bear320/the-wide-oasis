import { ICabinMutation } from "../types";
import supabase from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
};

export const createCabin = async (newCabin: ICabinMutation) => {
  const { data, error } = await supabase.from("cabins").insert([newCabin]).select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }

  return data;
};

export const deleteCabin = async (id: number) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }

  return data;
};
