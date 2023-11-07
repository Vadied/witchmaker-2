import style from "./style.module.css";

import { FormErrors } from "@/models/response.model";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
  errors?: FormErrors;
};
const Input = ({ label, name, errors, ...rest }: Props) => {
  return (
    <div className={style.input}>
      <label htmlFor={name} className={style.label}>
        {label}
      </label>
      <div>
        <input id={name} {...rest} />
      </div>
      {errors?.[name] ? (
        <div className={style.error}>
          {errors?.[name].map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
