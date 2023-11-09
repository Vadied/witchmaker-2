import style from "./style.module.css";

import LoginForm from "@/ui/users/loginForm";

export default function Page() {
  return (
    <main className={style.container}>
      <div className={style.panel}>
        <LoginForm />
      </div>
    </main>
  );
}
