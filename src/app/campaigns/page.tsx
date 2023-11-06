import { Suspense } from "react";

import style from "./Campaigns.module.css";

import { fetchCampaignsPages } from "@/app/lib/campaigns/data";

import CampaignList from "@/app/components/campaigns/list";
import Search from "@/app/components/search";
import Pagination from "@/app/components/pagination";

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};
const Page = async ({ searchParams }: Props) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCampaignsPages(query);

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
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Page;
