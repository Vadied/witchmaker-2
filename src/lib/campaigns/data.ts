import { unstable_noStore as noStore } from "next/cache";

import connect from "@/lib//database";

import { Campaign } from "@/schemas/Campaign";

import { ITEMS_PER_PAGE } from "@/assets/constants";

export const getCampaigns = async () => {
  // Add noStore() here prevent the response from being cached.
  noStore();
  try {
    await connect();
    const data = await Campaign.find();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
};

export const getCampaign = async (slug: string) => {
  noStore();
  try {
    await connect();
    const data = Campaign.findOne({ slug });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
};

export const getCampaignsFiltered = async (
  query: string,
  currentPage: number
) => {
  if (currentPage < 1) return [];

  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    await connect();
    const data = await Campaign.find({ name: { $regex: query } })
      .skip(offset)
      .limit(ITEMS_PER_PAGE);

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
};

export const fetchCampaignsPages = async (query: string) => {
  try {
    await connect();
    const count = await Campaign.countDocuments({ name: { $regex: query } });
    return Math.ceil(Number(count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
};
