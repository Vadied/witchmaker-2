import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

import style from "./Pagination.module.css";

export default function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  if (isDisabled)
    return (
      <div className={`${style.page} ${style.arrow} disabled ${direction}`}>
        {icon}
      </div>
    );

  return (
    <Link className={`${style.page} ${style.arrow} ${direction}`} href={href}>
      {icon}
    </Link>
  );
}
