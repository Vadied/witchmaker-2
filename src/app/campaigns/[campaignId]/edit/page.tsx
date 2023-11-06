import style from "./style.module.css";

import { getCampaign } from "@/app/lib/campaigns/data";

type Props = { params: { campaignId: string } };
const Page = async ({ params }: Props) => {

  const campaign = await getCampaign(params.campaignId);

  if (!campaign) return <div>No data recovered</div>;

  const deleteRecord = async () => {
    console.log("delete", IDBCursorWithValue);
  };

  return (
    <div className="campaign-details">
      <h2 className={style.title}>
        <div>Campagna</div>
        <div className={style.actions}></div>
      </h2>
    </div>
  );
};

export default Page;
