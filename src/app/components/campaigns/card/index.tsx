"use client";
import { useRouter } from "next/navigation";
import style from "./style.module.css";
import { Campaign } from "@/models/campaign.model";

import Button from "../../button";

const CampaignCard = ({ id, name }: Campaign) => {
  const router = useRouter();

  const navigateToCampaign = () => {
    router.push(`campaigns/${id}`);
  };

  return (
    <div className={style.campaignCard}>
      <h3>{name}</h3>
      <div>
        <Button handleClick={navigateToCampaign}>Show</Button>
      </div>
    </div>
  );
};

export default CampaignCard;
