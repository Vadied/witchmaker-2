import { unstable_noStore as noStore } from "next/cache";

import connect from "@/lib//database";

import { User } from "@/schemas/User";

export const getUser = async (email: string) => {
  noStore();
  try {
    await connect();
    const data = await User.findOne({ email });
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
};
