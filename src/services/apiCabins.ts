import supabase from "./supabase";

export const getCabins = async () => {
  try {
    const { data } = await supabase.from("cabins").select("*");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }
};
