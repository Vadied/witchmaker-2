export interface ResponseData {
  [key: string]: any;
}

export type FormErrors = {
  [key: string]: string[];
};

export type FormState = {
  message: string | null;
  errors?: FormErrors;
};

export type Reference = {
  id: string;
  slug: string;
}
