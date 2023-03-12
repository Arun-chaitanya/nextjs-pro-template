import _get from "lodash/get";
import _set from "lodash/set";

function set(key: string) {
  const ONBOARDING = JSON.parse(localStorage.getItem("ONBOARDING") || "{}");
  _set(ONBOARDING, key, true);
  localStorage.setItem("ONBOARDING", JSON.stringify(ONBOARDING));
}

function get(key: string) {
  const ONBOARDING = JSON.parse(localStorage.getItem("ONBOARDING") || "{}");
  return _get<boolean>(ONBOARDING, key, false);
}

const onboarding = { set, get };

export default onboarding;
