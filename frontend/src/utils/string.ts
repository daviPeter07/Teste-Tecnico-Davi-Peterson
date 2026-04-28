export const truncate = (value?: string | null, limit = 100): string => {
  if (!value) return "-";
  if (value.length <= limit) return value;
  return value.slice(0, limit).trimEnd() + "…";
};

export const ensureString = (value: unknown): string => {
  if (value == null) return "";
  return String(value);
};

export const ellipsize = (value?: string | null, limit = 100): string =>
  truncate(value, limit);
