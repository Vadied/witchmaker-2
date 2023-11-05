import { Suspense } from "react";

import { ICampaign } from "@/models/campaign.model";

import style from "./Campaigns.module.css";

import { getCampaigns } from "@/app/lib/campaigns";
import CampaignList from "@/app/components/campaignList";
import Search from "@/app/components/search";

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};
const Page = async ({ searchParams }: Props) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 0;

  return (
    <div className={style.campaignList}>
      <h2 className={style.title}>
        <div>Campaigns</div>
      </h2>
      <Search placeholder="Search Campaigns" />
      <div className={style.content}>
        <Suspense>
          <CampaignList query={query} currentPage={currentPage}/>
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
};

export default Page;
