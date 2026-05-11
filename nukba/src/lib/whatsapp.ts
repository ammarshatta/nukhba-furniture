export function buildWAUrl(
  waNumber: string,
  messageText: string,
  refToken?: string
): string {
  const text = refToken ? `${messageText}\n[ref:${refToken}]` : messageText;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
}

export function resolveWANumber(
  productNumber: string | undefined,
  globalNumber: string
): string {
  return productNumber?.trim() || globalNumber;
}
