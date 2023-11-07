import Link from "next/link";

import style from "./style.module.css";

import { deleteCampaign } from "@/app/lib/campaigns/actions";

import Button from "@/app/components/button";

type Props = {
  _id: string;
  name: string;
  slug: string;
};
const Card = ({ _id, name, slug }: Props) => {
  const deleteInvoiceWithId = deleteCampaign.bind(null, _id);

  return (
    <div className={style.card}>
      <h3>{name}</h3>
      <div className={style.actions}>
        <Link href={`/campaigns/${slug}`}>
          <Button>Show</Button>
        </Link>
        <Link href={`/campaigns/${slug}/edit`}>
          <Button>Edit</Button>
        </Link>
        <form action={deleteInvoiceWithId}>
          <button>
            <Button type="danger">Delete</Button>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Card;
