import style from "./style.module.css";

import Breadcrumbs from "@/app/components/breadcrumbs";
import Form from "@/app/components/campaigns/createForm";

type Props = {};
const Page = ({}: Props) => {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "Create campaign",
            href: `/campaigns`,
            active: true,
          },
        ]}
      />
      <h2 className={style.title}>
        <div>New Campaign</div>
      </h2>
      <Form />
    </>
  );
};

export default Page;
