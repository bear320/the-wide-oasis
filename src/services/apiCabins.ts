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

export const deleteCabin = async (id: number) => {
  //   const { error } = await supabase
  //     .from("cabins")
  //     .delete()
  //     .eq("some_column", "someValue");

  try {
    await supabase.from("cabins").delete().eq("id", id);
  } catch (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
};
