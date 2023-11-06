import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Campaign } from "@/models/campaign.model";
import Button from "../../components/button";

type Props = {};
const Page = ({}: Props) => {

  return (
    <>
      <h2 className="title">
        <div>New Campaign</div>
      </h2>
    </>
  );
};

export default Page;
