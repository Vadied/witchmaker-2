import style from "./style.module.css";

import { getCampaign } from "@/app/lib/campaigns/data";

import Breadcrumbs from "@/app/components/breadcrumbs";
import Form from "@/app/components/campaigns/editForm";

type Props = { params: { slug: string } };
const Page = async ({ params }: Props) => {
  const campaign = await getCampaign(params.slug);

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
      <Form campaign={campaign} />
    </>
  );
};

export default Page;
