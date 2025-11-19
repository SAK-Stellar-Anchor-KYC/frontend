import { Country } from '@/types';

export const SEPA_COUNTRIES: Country[] = [
  { code: 'AT', name: 'Austria', isSEPA: true },
  { code: 'BE', name: 'Belgium', isSEPA: true },
  { code: 'BG', name: 'Bulgaria', isSEPA: true },
  { code: 'HR', name: 'Croatia', isSEPA: true },
  { code: 'CY', name: 'Cyprus', isSEPA: true },
  { code: 'CZ', name: 'Czech Republic', isSEPA: true },
  { code: 'DK', name: 'Denmark', isSEPA: true },
  { code: 'EE', name: 'Estonia', isSEPA: true },
  { code: 'FI', name: 'Finland', isSEPA: true },
  { code: 'FR', name: 'France', isSEPA: true },
  { code: 'DE', name: 'Germany', isSEPA: true },
  { code: 'GR', name: 'Greece', isSEPA: true },
  { code: 'HU', name: 'Hungary', isSEPA: true },
  { code: 'IS', name: 'Iceland', isSEPA: true },
  { code: 'IE', name: 'Ireland', isSEPA: true },
  { code: 'IT', name: 'Italy', isSEPA: true },
  { code: 'LV', name: 'Latvia', isSEPA: true },
  { code: 'LI', name: 'Liechtenstein', isSEPA: true },
  { code: 'LT', name: 'Lithuania', isSEPA: true },
  { code: 'LU', name: 'Luxembourg', isSEPA: true },
  { code: 'MT', name: 'Malta', isSEPA: true },
  { code: 'MC', name: 'Monaco', isSEPA: true },
  { code: 'NL', name: 'Netherlands', isSEPA: true },
  { code: 'NO', name: 'Norway', isSEPA: true },
  { code: 'PL', name: 'Poland', isSEPA: true },
  { code: 'PT', name: 'Portugal', isSEPA: true },
  { code: 'RO', name: 'Romania', isSEPA: true },
  { code: 'SM', name: 'San Marino', isSEPA: true },
  { code: 'SK', name: 'Slovakia', isSEPA: true },
  { code: 'SI', name: 'Slovenia', isSEPA: true },
  { code: 'ES', name: 'Spain', isSEPA: true },
  { code: 'SE', name: 'Sweden', isSEPA: true },
  { code: 'CH', name: 'Switzerland', isSEPA: true },
  { code: 'GB', name: 'United Kingdom', isSEPA: true },
];

export const ALL_COUNTRIES: Country[] = [
  ...SEPA_COUNTRIES,
  { code: 'US', name: 'United States', isSEPA: false },
  { code: 'CA', name: 'Canada', isSEPA: false },
  { code: 'AU', name: 'Australia', isSEPA: false },
  { code: 'NZ', name: 'New Zealand', isSEPA: false },
  { code: 'JP', name: 'Japan', isSEPA: false },
  { code: 'KR', name: 'South Korea', isSEPA: false },
  { code: 'SG', name: 'Singapore', isSEPA: false },
  { code: 'HK', name: 'Hong Kong', isSEPA: false },
  { code: 'AE', name: 'United Arab Emirates', isSEPA: false },
  { code: 'BR', name: 'Brazil', isSEPA: false },
  { code: 'MX', name: 'Mexico', isSEPA: false },
  { code: 'AR', name: 'Argentina', isSEPA: false },
  { code: 'CL', name: 'Chile', isSEPA: false },
  { code: 'IN', name: 'India', isSEPA: false },
  { code: 'ZA', name: 'South Africa', isSEPA: false },
];

export const getCountryByCode = (code: string): Country | undefined => {
  return ALL_COUNTRIES.find(c => c.code === code);
};

export const isSEPACountry = (code: string): boolean => {
  const country = getCountryByCode(code);
  return country?.isSEPA ?? false;
};
