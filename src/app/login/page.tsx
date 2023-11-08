import style from "./style.module.css";

import LoginForm from "@/app/ui/loginForm";

export default function LoginPage() {
  return (
    <main className={style.container}>
      <div className={style.panel}>
        <LoginForm />
      </div>
    </main>
  );
}
