import { ICampaign } from "@/models/campaign.model";
import { sql } from "@vercel/postgres";

export const getCampaigns = async () => {
  const { rows } = await sql`SELECT * FROM campaigns`;
  return rows as ICampaign[];
};

export const getCampaignsFiltered = async (
  query: string,
  currentPage: number
) => {
  const { rows } = await sql`
        SELECT * 
        FROM campaigns 
        WHERE name ILIKE ${'%' + query + '%'}
        LIMIT 10 
        OFFSET ${currentPage * 10}
    `;
    console.log(query, rows)
  return rows as ICampaign[];
};
