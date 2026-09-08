// Indian number formatting helpers (₹ with lakh/crore grouping)

const inrFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export function formatINR(value, decimals = 0) {
  if (!Number.isFinite(value)) return '₹0';
  const rounded = Math.round(value * 10 ** decimals) / 10 ** decimals;
  if (decimals === 0) return '₹' + inrFormatter.format(Math.round(rounded));
  return (
    '₹' +
    new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(rounded)
  );
}

export function formatNumber(value, decimals = 0) {
  if (!Number.isFinite(value)) return '0';
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value, decimals = 2) {
  if (!Number.isFinite(value)) return '0%';
  return value.toFixed(decimals) + '%';
}

export function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

// Short Indian words: 1,50,000 -> 1.5 Lakh, 2,00,00,000 -> 2 Crore
export function toIndianWords(value) {
  if (!Number.isFinite(value)) return '';
  const abs = Math.abs(value);
  if (abs >= 1e7) return (value / 1e7).toFixed(2).replace(/\.?0+$/, '') + ' Crore';
  if (abs >= 1e5) return (value / 1e5).toFixed(2).replace(/\.?0+$/, '') + ' Lakh';
  if (abs >= 1e3) return (value / 1e3).toFixed(2).replace(/\.?0+$/, '') + ' Thousand';
  return String(Math.round(value));
}
