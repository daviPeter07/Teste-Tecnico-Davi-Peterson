export const formatCurrency = (
  value = 0,
  locale = "pt-BR",
  currency = "BRL",
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value ?? 0);
};

export const toNumber = (value: unknown) => {
  const n = Number(value);
  return Number.isNaN(n) ? 0 : n;
};
