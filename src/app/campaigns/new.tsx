import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ICampaign } from "@/models/campaign.model";
import Button from "../components/button";

type Props = {};
const NewCampaign = ({}: Props) => {
  const router = useRouter();
  const [record, setRecord] = useState<ICampaign>({} as ICampaign);

  const updateRecord = (field: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setRecord((r) => ({ ...r, [field]: e?.target?.value || "" }));

  const handleClick = async () => {
    const { data } = await axios.post(`/campaigns`, { ...record });
    if (!data.id) return;

    router.push(`/campaigns/${data.id}`);
  };

  return (
    <>
      <h2 className="title">
        <div>New Campaign</div>
        <Button handleClick={handleClick}>Save</Button>
      </h2>
      <div className="content">
        <label htmlFor="name">Name</label>
        <input id="name" onChange={updateRecord("name")} />
      </div>
    </>
  );
};

export default NewCampaign;
