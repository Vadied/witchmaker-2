import { unstable_noStore as noStore } from "next/cache";

import connect from "@/app/lib/db/database";

import { TUser } from "@/app/models/user.model";
import { User } from "@/app/schemas/User";

export const getUser = async (email: string): Promise<TUser | undefined> => {
  try {
    noStore();
    await connect();

    const data = await User.findOne({ email });
    return data as TUser;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
};
