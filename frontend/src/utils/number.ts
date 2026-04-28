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

export const parseCurrency = (value: string) => {
  const normalized = value
    .replace(/\s/g, "")
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".");
  const parsed = Number(normalized);

  return Number.isNaN(parsed) ? 0 : parsed;
};

export const formatCurrencyInput = (value: unknown) => {
  const digits = String(value ?? "").replace(/\D/g, "");
  const normalizedDigits = digits || "0";
  const cents = Number(normalizedDigits) / 100;

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents);
};
