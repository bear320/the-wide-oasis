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

export const createCabin = async (cabin: ICabinMutation) => {
  if (cabin.image instanceof File) {
    // 1. Upload image
    const { data: storageData, error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(`${crypto.randomUUID()}-${cabin.image.name}`, cabin.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Cabin image could not be uploaded.");
    }

    const imageUrl = `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/cabin-images/${storageData.path}`;

    // 2. Create new cabin
    const { data: cabinData, error: cabinError } = await supabase
      .from("cabins")
      .insert([
        {
          ...cabin,
          image: imageUrl,
        },
      ])
      .select()
      .single();

    // 3. Delete the image if there was an error creating new cabin
    if (cabinError) {
      supabase.storage.from("cabin-images").remove([imageUrl]);
      console.error(cabinError);
      throw new Error("New cabin could not be created.");
    }

    return cabinData;
  }
};

export const editCabin = async (id: number, cabin: ICabinMutation) => {
  if (cabin.image instanceof File) {
    // 1. Upload image
    const { data: storageData, error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(`${crypto.randomUUID()}-${cabin.image.name}`, cabin.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Cabin image could not be uploaded.");
    }

    const imageUrl = `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/cabin-images/${storageData.path}`;

    // 2. Edit cabin
    const { data: cabinData, error: cabinError } = await supabase
      .from("cabins")
      .update({ ...cabin, image: imageUrl })
      .eq("id", id)
      .select()
      .single();

    // 3. Delete the image if there was an error editing cabin
    if (cabinError) {
      supabase.storage.from("cabin-images").remove([imageUrl]);
      console.error(cabinError);
      throw new Error("New cabin could not be created.");
    }

    return cabinData;
  } else {
    const { data: cabinData, error: cabinError } = await supabase
      .from("cabins")
      .update(cabin)
      .eq("id", id)
      .select();

    if (cabinError) {
      console.error(cabinError);
      throw new Error("New cabin could not be edited.");
    }

    return cabinData;
  }
};

export const deleteCabin = async (id: number) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }

  return data;
};
