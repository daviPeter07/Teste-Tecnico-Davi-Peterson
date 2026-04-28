export type ApiMessageResponse = {
  message: string;
};

export type ApiValidationErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

export type PaginatedLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type PaginatedMeta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginatedLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginatedMeta;
};
