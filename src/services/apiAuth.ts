import { IUser } from "../types";
import supabase from "./supabase";

export const signup = async ({ fullName, email, password }: Omit<IUser, "id" | "avatar">) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const updateCurrentUser = async ({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}) => {
  // 1. Update fullName or password
  let updateData: { password?: string; data?: { fullName?: string } } = {};
  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };

  const { data: updatedUser, error: updateError } = await supabase.auth.updateUser(updateData);

  if (updateError) throw new Error(updateError.message);

  if (!avatar) return updatedUser;

  // 2. Upload the avatar image
  const fileName = `avatar-${updatedUser.user.id}-${crypto.randomUUID()}`;

  const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedAvatarUser, error: updateAvatarError } = await supabase.auth.updateUser({
    data: {
      avatar: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (updateAvatarError) throw new Error(updateAvatarError.message);

  return updatedAvatarUser;
};
