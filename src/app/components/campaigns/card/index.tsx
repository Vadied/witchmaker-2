import style from "./style.module.css";

import Button from "@/app/components/button";
import Link from "next/link";

type Props = {
  name: string;
  slug: string;
};
const Card = ({ name, slug }: Props) => {
  return (
    <div className={style.campaignCard}>
      <h3>{name}</h3>
      <div>
        <Button>
          <Link href={`campaigns/${slug}`}>Show</Link>
        </Button>
      </div>
    </div>
  );
};

export default Card;
