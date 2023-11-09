import style from "./style.module.css";

import { getCampaign } from "@/lib/campaigns/data";

import { TCampaign } from "@/models/campaign.model";

import Breadcrumbs from "@/ui/breadcrumbs";
import Form from "@/ui/campaigns/editForm";

type Props = { params: { slug: string } };
const Page = async ({ params }: Props) => {
  const campaign: TCampaign = await getCampaign(params.slug);

  if (!campaign) return <div>No data recovered</div>;

  const breadcrumbs = [
    {
      label: "Campaign details",
      href: `/campaigns/${params.slug}`,
    },
    {
      label: "Edit",
      href: `/campaigns/${params.slug}/edit`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className={style.title}>{campaign.name} Edit</h2>
      <Form
        _id={campaign._id.toString()}
        name={campaign.name}
        slug={campaign.slug}
        description={campaign.description}
        start_date={campaign.start_date}
        end_date={campaign.end_date}
        status={campaign.status}
      />
    </>
  );
};

export default Page;
