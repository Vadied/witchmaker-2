import Breadcrumbs from "@/app/components/breadcrumbs";
import Form from "@/app/components/campaigns/form";

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
      <h2 className="title">
        <div>New Campaign</div>
      </h2>
      <Form confirmLabel="Create Campaign" oldUrl="/campaigns" />
    </>
  );
};

export default Page;
