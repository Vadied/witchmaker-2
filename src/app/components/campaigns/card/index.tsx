import style from "./style.module.css";

import Button from "@/app/components/button";
import Link from "next/link";

type Props = {
  name: string;
  slug: string;
};
const Card = ({ name, slug }: Props) => {
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
      </div>
    </div>
  );
};

export default Card;
