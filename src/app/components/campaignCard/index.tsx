

import { useRouter } from "next/navigation";
import { ICampaign } from "@/models/campaign.model";

import Button from "../button";

const CampaignCard = ({ _id, name }: ICampaign) => {
  const router = useRouter();

  const navigateToCampaign = () => {
    router.push(`campaigns/${_id}`);
  };

  return (
    <div>
      <h3>Campaign {name}</h3>
      <div>
        <Button handleClick={navigateToCampaign}>Show</Button>
      </div>
    </div>
  );
};

export default CampaignCard;
