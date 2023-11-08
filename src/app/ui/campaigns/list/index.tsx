import style from "./style.module.css";

import { getCampaignsFiltered } from "@/app/lib/campaigns/data";
import Card from "@/app/ui/campaigns/card";

type Props = { query: string; currentPage: number };
const List = async ({ query, currentPage }: Props) => {
  const campaigns = await getCampaignsFiltered(query, currentPage);

  return (
    <div className={style.list}>
      {campaigns.map((c) => (
        <Card key={c.slug} _id={c._id.toString()} name={c.name} slug={c.slug} />
      ))}
    </div>
  );
};

export default List;
