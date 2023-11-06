import { Campaign } from "@/models/campaign.model";
import { sql } from "@vercel/postgres";

import { ITEMS_PER_PAGE } from "@/app/assets/constants";

export const getCampaigns = async () => {
  try {
    const { rows } = await sql`SELECT * FROM campaigns`;
    return rows as Campaign[];
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
};

export const getCampaign = async (id: string) => {
  try {
    const { rows } = await sql`SELECT * FROM campaigns WHERE id = ${id}`;
    if (rows.length === 0) return null;

    return (rows as Campaign[])[0];
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

  try {
    const { rows } = await sql`
        SELECT * 
        FROM campaigns 
        WHERE name ILIKE ${"%" + query + "%"}
        LIMIT ${ITEMS_PER_PAGE} 
        OFFSET ${(currentPage - 1) * ITEMS_PER_PAGE}
    `;
    return rows as Campaign[];
  } catch (error) {
    console.error("Database Error:", error);
    return [];
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
    return 0;
  }
};
