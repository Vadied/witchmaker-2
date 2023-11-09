import Link from "next/link";

import style from "./Pagination.module.css";

type Props = {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
};
export default function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: Props) {
  const isFirst =
    position === "first" || position === "single" ? "is-first" : "";
  const isLast = position === "last" || position === "single" ? "is-first" : "";
  const isMiddle = position === "middle" ? "is-middle" : "";

  const isActiveClass = isActive ? "is-active" : "";

  if (isActive || isMiddle)
    return (
      <div
        className={`${style.page} ${isFirst} ${isLast} ${isActiveClass} ${isMiddle}`}
      >
        {page}
      </div>
    );

  return (
    <Link
      href={href}
      className={`${style.page} ${isFirst} ${isLast} ${isActiveClass} ${isMiddle}`}
    >
      {page}
    </Link>
  );
}
