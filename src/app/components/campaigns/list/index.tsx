import { Campaign } from "@/models/campaign.model";

import style from "./style.module.css";

import { getCampaignsFiltered } from "@/app/lib/campaigns/data";
import CampaignCard from "@/app/components/campaigns/card";

type Props = { query: string; currentPage: number };
const CampaignList = async ({ query, currentPage }: Props) => {
  const campaigns = await getCampaignsFiltered(query, currentPage);
  return (
    <div className={style.campaignList}>
      {campaigns.map((c) => (
        <CampaignCard key={c.id} {...c} />
      ))}
    </div>
  );
};

export default CampaignList;
