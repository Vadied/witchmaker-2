import { notFound } from "next/navigation";

import Breadcrumbs from "@/app/ui/breadcrumbs";
import style from "./style.module.css";

import { getCampaign } from "@/app/lib/campaigns/data";

type Props = { params: { slug: string } };
const Page = async ({ params }: Props) => {
  const campaign = await getCampaign(params.slug);

  if (!campaign) notFound();

  return (
    <div className="campaign-details">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Campaign details",
            href: `/campaigns/${params.slug}`,
            active: true,
          },
        ]}
      />
      <h2 className={style.title}>
        <div>{campaign.name}</div>
        <div className={style.actions}></div>
      </h2>
    </div>
  );
};

export default Page;
