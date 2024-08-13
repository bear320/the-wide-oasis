import supabase from "./supabase";

export const getCabins = async () => {
  try {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) throw new Error("Cabin could not be deleted.");

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCabin = async (id: number) => {
  try {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) throw new Error("Cabin could not be deleted.");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
