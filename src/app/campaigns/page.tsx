import { Suspense } from "react";

import style from "./style.module.css";

import { fetchCampaignsPages } from "@/app/lib/campaigns/data";

import CampaignList from "@/app/ui/campaigns/list";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/pagination";
import Button from "@/app/ui/button";
import Link from "next/link";

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
        <div className={style.actions}>
          <Button>
            <Link href="campaigns/new">Add Campaign</Link>
          </Button>
        </div>
      </h2>
      <Search placeholder="Search Campaigns" />
      <div className={style.content}>
        <Suspense>
          <CampaignList query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Page;
