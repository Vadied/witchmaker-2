import style from "./style.module.css";

import { FormErrors } from "@/models/response.model";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
  errors?: FormErrors;
  value?: any;
};
const Input = ({ label, name, value, errors, ...rest }: Props) => {
  return (
    <div className={style.input}>
      <label htmlFor={name} className={style.label}>
        {label}
      </label>
      <div>
        <input id={name} name={name} defaultValue={value} {...rest} />
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
