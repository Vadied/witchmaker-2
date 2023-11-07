import Link from "next/link";

import style from "./style.module.css";

type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

type Props = {
  breadcrumbs: Breadcrumb[];
};
export default function Breadcrumbs({ breadcrumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={style.navigation}>
      <ol className={style.list}>
        {breadcrumbs.map((bc, index) => (
          <li
            key={bc.href}
            aria-current={bc.active}
            className={`${style.item} ${bc.active ? "active" : ""}`}
          >
            <Link href={bc.href}>{bc.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className={style.separator}>/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
