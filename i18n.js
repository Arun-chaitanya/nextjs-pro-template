module.exports = {
  locales: ["en"],
  defaultLocale: "en",
  pages: {
    "*": ["404", "common", "footer", "header", "kyc", "moments", "packs"],
    "/": ["refer", "homepage"],
    "/auth/action": ["auth-action"],
    "/campaign/[code]": ["homepage"],
    "/welcomebonus": ["homepage"],
    "/activity": ["activity"],
    "/settings/mfa": ["mfa"],
    "/auth": ["authentication", "mfa"],
    "/sign-in": ["authentication", "mfa"],
    "/sign-up": ["authentication", "mfa"],
    "/forgot-password": ["authentication"],
    "/gateway/funds/withdraw": ["mfa"],
    "/about-us": ["company"],
    "/sitemap": ["company"],
    "/settings/email": ["email"],
    "/settings/password": ["auth-action"],
    "/nft/status/[hash]": ["moment-status"],
    "/referral": ["refer", "authentication"],
    "/roadmap": ["roadmap"],
    "/icc/legacy": ["icc"],
    "/icc": ["crictos"],
    "/sa20": ["refer", "homepage"],
    "/careers": ["careers"],
    "/how-it-works": ["onboarding"],
    "/market/packs/open/[sid]": ["pack-open"],
    "/market/packs/status/[sids]": ["pack-status"],
    "/market/nfts/status/[pId]": ["shop-status"],
    "/terms-of-use": ["privacy-terms"],
    "/privacy-policy": ["privacy-terms"],
    "/play/onboarding": ["play"],
    "/play/flash/status/[lid]": ["flash-status"],
    "/market/sets/status/[lid]": ["sets-status"],
    "/frame/play": ["play-game"],
    "rgx:/wallet": ["gateway", "gateway-add", "wallet"],
    "rgx:^/faqs*": ["faqs"],
    "rgx:^/help*": ["help-center"],
    "rgx:^/videos*": ["video-tutorial"],
    "rgx:^/gateway*": ["gateway", "gateway-add", "wallet"],
    "rgx:^/gateway/crypto*": ["gateway-crypto"],
    "rgx:^/market*": ["marketplace", "manage-teams"],
    "rgx:^/market/nfts*": ["marketplace-search", "profile"],
    "rgx:^/market/collection*": ["marketplace-search", "pack-open", "profile", "refer"],
    "rgx:^/market/packs*": ["pack"],
    "rgx:^/players*": ["players"],
    "rgx:^/teams*": ["teams"],
    "rgx:^/settings/profile*": ["profile-settings"],
    "rgx:^/settings*": ["settings", "profile-settings"],
    "rgx:^/play*": ["play-game", "manage-teams", "challenges", "refer"],
    "rgx:^/play/flash*": ["challenges"],
    "rgx:^/market/sets*": ["challenges", "sets"],
    "rgx:^/flowverse*": ["flowverse"],
    "rgx:^/view-teams*": ["challenges"],
  },
};
