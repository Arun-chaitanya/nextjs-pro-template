import { User } from "firebase/auth";
import pick from "lodash/pick";
import mixpanel from "mixpanel-browser";
import ReactGA from "react-ga4";

import { GA4_ID, MIXPANEL_ID, WEBENGAGE_ID, FB_PIXEL_ID, INSTANA_ID } from "@config/constants";

const packKeys = [
  "_id",
  "allowedAction",
  "isFeatured",
  "momentsDistribution",
  "name",
  "noOfPeopleAhead",
  "packDistributionId",
  "packsLeft",
  "perSessionLimit",
  "perUserLimit",
  "price",
  "quantity",
  "rarity",
  "release",
  "saleDate",
  "saleStatus",
  "series",
  "slug",
  "totalMomentsCount",
  "totalPeopleInQueue",
  "totalSold",
];

const momentKeys = [
  "_id",
  "allowSearch",
  "averageAsk",
  "blockChainMomentGroupId",
  "description",
  "highestAsk",
  "lastListingTime",
  "listings",
  "lowestAsk",
  "momentClass",
  "name",
  "quantity",
  "slug",
  "tournamentStage",
  "matchDate",
  "momentType",
  "playerId",
  "primaryPlayerName",
  "primaryTeam",
  "team",
  "tournament",
  "host",
  "momentStatusDistribution",
  "noOfSellers",
  "isAvailableForSale",
  "momentId",
  "momentSerialNumber",
  "ownedBy",
];

export function trackUserID(user: User) {
  if (INSTANA_ID && typeof ineum !== "undefined") ineum("user", user.uid);

  if (WEBENGAGE_ID && typeof webengage !== "undefined" && user.emailVerified) {
    webengage.user.login(user.uid);
    user.email && webengage.user.setAttribute("we_email", user.email);
  }

  if (MIXPANEL_ID) {
    mixpanel.identify(user.uid);
    mixpanel.people.set({ user_id: user.uid, display_name: user.displayName });
  }

  if (GA4_ID) ReactGA.set({ userId: user.uid });
}

export function trackUsername(username: string) {
  if (WEBENGAGE_ID && typeof webengage !== "undefined") {
    webengage.user.setAttribute("we_first_name", username);
  }

  if (MIXPANEL_ID) {
    mixpanel.people.set({ username });
  }

  if (GA4_ID) ReactGA.set({ username });
}

export function trackEvent(event: string, data?: Record<string, any>) {
  let trackingData = { ...data };
  if (trackingData.pack) {
    let packData = pick(trackingData.pack, packKeys);
    packData.series = Number(packData.series);
    packData.release = Number(packData.release);
    packData.packMasterId = packData._id;
    delete trackingData.pack;
    delete packData._id;

    trackingData = {
      ...packData,
      ...trackingData,
    };
  }
  if (trackingData.moment) {
    const momentData = pick(trackingData.moment, momentKeys);
    delete trackingData.moment;
    trackingData = { ...momentData, ...trackingData };
  }
  const localTrackingId = localStorage.getItem("FC_TRACKING_ID");
  trackingData.trackingId = localTrackingId || Math.random().toString().split(".")[1];
  if (!localTrackingId) localStorage.setItem("FC_TRACKING_ID", trackingData.trackingId);
  trackingData.currentPage = window.location.pathname + window.location.search;

  if (WEBENGAGE_ID && typeof webengage !== "undefined") webengage.track(event, trackingData);
  if (MIXPANEL_ID) mixpanel.track(event, trackingData);
  if (GA4_ID) ReactGA.event(event, trackingData);
}

export function handleTrackEvent(event?: string, data?: Record<string, any>) {
  return function track() {
    if (event) trackEvent(event, data);
  };
}

export function trackConversion(event: string, data?: Record<string, any>) {
  if (FB_PIXEL_ID && typeof fbq !== "undefined") fbq("track", event, data);
}

export function reportError(error: Error) {
  if (INSTANA_ID && typeof ineum !== "undefined") ineum("reportError", error);
}
