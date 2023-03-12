export function formatPrice(price: number, options?: { prefix?: boolean; postfix?: boolean }) {
  const decimal2 = Math.floor(price * 100) / 100;
  let formattedPrice = decimal2 < 0 ? `-$${Math.abs(decimal2)}` : `$${decimal2}`;
  if (options?.prefix) formattedPrice = `USD ${formattedPrice}`;
  if (options?.postfix) formattedPrice = `${formattedPrice} USD`;
  return formattedPrice;
}

export function abbrPrice(price: number, decimals = 1) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: decimals,
    maximumSignificantDigits: 3,
  }).format(price);
}

export function abbrNumber(val: number) {
  const ceil = Math.ceil(val);
  if (ceil.toString().length > 3) return Math.ceil(ceil / 1000) + "k";
  return ceil;
}
