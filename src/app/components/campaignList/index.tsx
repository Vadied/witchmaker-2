import { ICampaign } from "@/models/campaign.model";

import style from "./Campaigns.module.css";

import { getCampaignsFiltered } from "@/app/lib/campaigns";
import CampaignCard from "@/app/components/campaignCard";

type Props = { query: string; currentPage: number };
const CampaignList = async ({ query, currentPage }: Props) => {
  const campaigns = await getCampaignsFiltered(query, currentPage);
  return (
    <div className={style.campaignList}>
      {campaigns.map((c: ICampaign) => (
        <CampaignCard key={c._id} {...c} />
      ))}
    </div>
  );
};

export default CampaignList;
