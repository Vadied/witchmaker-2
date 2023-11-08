import { useFormStatus } from "react-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import style from "./style.module.css";

import Button from "@/app/ui/button";

export default function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending}>
      <div>
        Log in <ArrowRightIcon />
      </div>
    </Button>
  );
}
