import Form from "@/app/components/campaigns/form";

type Props = {};
const Page = ({}: Props) => {

  return (
    <>
      <h2 className="title">
        <div>New Campaign</div>
      </h2>
      <Form />
    </>
  );
};

export default Page;
