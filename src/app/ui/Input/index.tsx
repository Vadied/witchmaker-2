import style from "./style.module.css";

import { FormErrors } from "@/app/models/response.model";

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  errors?: FormErrors;
  value?: any;
  required?: boolean;
};
const Input = ({
  label,
  name,
  value,
  required,
  type = "text",
  errors,
}: Props) => {
  return (
    <div className={style.input}>
      <label htmlFor={name} className={style.label}>
        {label}
      </label>
      <div>
        <input
          id={name}
          name={name}
          defaultValue={value}
          type={type}
          aria-describedby={`${name}-error`}
          required={required}
        />
      </div>
      {errors?.[name] ? (
        <div id={`${name}-error`} aria-live="polite" className={style.error}>
          {errors?.[name].map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
