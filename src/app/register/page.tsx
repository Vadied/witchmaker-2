import style from "./style.module.css";

import RegisterForm from "@/app/ui/users/registerForm";

export default function LoginPage() {
  return (
    <main className={style.container}>
      <div className={style.panel}>
        <RegisterForm />
      </div>
    </main>
  );
}
