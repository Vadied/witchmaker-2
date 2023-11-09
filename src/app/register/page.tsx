import style from "./style.module.css";

import RegisterForm from "@/ui/users/registerForm";

export default function Page() {
  return (
    <main className={style.container}>
      <div className={style.panel}>
        <RegisterForm />
      </div>
    </main>
  );
}
