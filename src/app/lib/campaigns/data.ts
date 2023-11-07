import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

import { Campaign } from "@/models/campaign.model";

import { ITEMS_PER_PAGE } from "@/app/assets/constants";

export const getCampaigns = async () => {
  // Add noStore() here prevent the response from being cached.
  noStore();
  try {
    const { rows } = await sql`
      SELECT * 
      FROM campaigns
      JOIN users 
        ON campaigns.master = users.id
    `;
    return rows as Campaign[];
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
};

export const getCampaign = async (slug: string) => {
  noStore();
  try {
    const { rows } = await sql`
      SELECT * 
      FROM campaigns
      JOIN users 
        ON campaigns.master = users.id
      WHERE slug = ${slug}
    `;
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
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const { rows } = await sql`
        SELECT * 
        FROM campaigns      
        JOIN users 
          ON campaigns.master = users.id
        WHERE name ILIKE ${`%${query}%`}
        LIMIT ${ITEMS_PER_PAGE} 
        OFFSET ${offset}
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
