export type ResponseAPI<Data, ExtraProps extends object = Record<string, never>> = {
  success: boolean;
  code: number;
  message: string;
  data: Data;
} & ExtraProps;

export type PaginatedParams<ExtraParams extends object = object> = {
  size: string;
  page: number;
} & ExtraParams;

export type LanguageParams<ExtraParams extends object = object> = {
  lang: string;
} & ExtraParams;

export type PaginatedResponse<Data, ExtraProps extends object = Record<string, never>> = {
  success: boolean;
  code: number;
  message: string;
  data: {
    page: number;
    lastPage: number;
    isLastPage: boolean;
    size: number;
    total: number;
    content: Data[];
  };
} & ExtraProps;
