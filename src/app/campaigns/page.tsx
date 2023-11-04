"use client";

import { useRouter } from "next/navigation";
import { ICampaign } from "@/models/campaign.model";
import Button from "../components/button";
import style from "./Campaigns.module.css";
import CampaignCard from "../components/campaignCard";

type Props = {};
const CampaignList = ({}: Props) => {
  const router = useRouter();

  const campaigns: ICampaign[] = [
    { name: "test", _id: "1" },
    { name: "test2", _id: "2" },
  ];

  const handleClick = () => {
    router.push("/campaigns/new");
  };

  return (
    <>
      <h2 className={style.title}>
        <div>Campaigns</div>
        <Button handleClick={handleClick}>New</Button>
      </h2>
      <div className={style.content}>
        {campaigns.map((c: ICampaign) => (
          <CampaignCard key={c._id} {...c} />
        ))}
      </div>
    </>
  );
};

export default CampaignList;
