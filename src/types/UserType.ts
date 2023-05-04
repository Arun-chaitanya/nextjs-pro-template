export type UserType = {
  partners?: { follow?: string[] };
  mfaEnabledAt?: string;
  authenticationMode?: AuthenticationMode;
  source?: "whatsapp" | "jio";
  whatsappConnected?: boolean;
  phone?: string;
  countryCode?: string;
  token?: string;
  created?: boolean;
  action?: string;
  waPhone?: string;
  waCountryCode?: string;
};

export enum AuthenticationMode {
  NONE = "none",
  MOBILE = "mobile_2fa",
  EMAIL = "email_2fa",
  TOTP = "totp_2fa",
  WA = "whatsapp",
}
