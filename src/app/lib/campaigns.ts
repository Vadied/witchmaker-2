import { ICampaign } from "@/models/campaign.model";
import { sql } from "@vercel/postgres";

import { ITEMS_PER_PAGE } from "@/app/assets/constants";


export const getCampaigns = async () => {
  try {
    const { rows } = await sql`SELECT * FROM campaigns`;
    return rows as ICampaign[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch campaigns.`);
  }
};

export const getCampaignsFiltered = async (
  query: string,
  currentPage: number
) => {
  if (currentPage < 1) return [];

  try {
    const { rows } = await sql`
        SELECT * 
        FROM campaigns 
        WHERE name ILIKE ${"%" + query + "%"}
        LIMIT ${ITEMS_PER_PAGE} 
        OFFSET ${(currentPage - 1) * ITEMS_PER_PAGE}
    `;
    return rows as ICampaign[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch campaigns.`);
  }
};

export const fetchCampaignsPages = async (query: string) => {
  try {
    const count = await sql`
    SELECT COUNT(*) FROM campaigns
  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of campaigns.");
  }
};
