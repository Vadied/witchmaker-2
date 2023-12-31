"use client";

import { usePathname, useSearchParams } from "next/navigation";

import style from "./Pagination.module.css";

import { generatePagination } from "@/lib/utils";
import PaginationNumber from "./PaginationNumber";
import PaginationArrow from "./PaginationArrow";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPosition = (page: string | number, index: number) => {
    if (index === 0) return "first";
    if (allPages.length === 1) return "single";
    if (page === "...") return "middle";
    if (index === allPages.length - 1) return "last";

    return undefined;
  };

  return (
    <>
      <div className={style.pagination}>
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className={style.pages}>
          {allPages.map((page, index) => {
            const position = getPosition(page, index);

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}
