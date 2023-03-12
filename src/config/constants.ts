export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
export const APP_ENVIRONMENT = process.env.NEXT_PUBLIC_APP_ENVIRONMENT || "";
export const INSTANA_ID = process.env.NEXT_PUBLIC_INSTANA_ID || "";
export const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID || "";
export const WEBENGAGE_ID = process.env.NEXT_PUBLIC_WEBENGAGE_ID || "";
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "";
export const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN || "";
export const TWITTER_WIDGET_SDK = "https://platform.twitter.com/widgets.js";
export const APP_NAME = "FanCraze";
export const APP_DESCRIPTION =
  "Collect & Trade Officially Licensed Cricket Collectibles, Secured With Blockchain Technology";
export const BREAKPOINTS = { xs: 550, sm: 760, md: 1020, lg: 1270, xl: 1420, xxl: 1600 };
export const IS_PROD = APP_ENVIRONMENT === "PRODUCTION";
export const CUSTOM_FILTERS = [
  "badgeList",
  "nftType",
  "listingStatus",
  "owner",
  "playerGender",
  "playerSkills",
  "serialType",
  "isFlex",
  "momentClass",
];
export const SORT_FILTERS = ["players", "teams", "tournament", "momentType"];