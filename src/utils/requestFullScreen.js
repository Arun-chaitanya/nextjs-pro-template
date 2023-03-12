import { trackEvent } from "@utils/analytics";

/**
 * Request full screen for element support multiple browsers.
 * @param ref {React.RefObject<any>}
 * @param eventData {Record<string, any>}
 * @returns {Promise<void>|*}
 */
function requestFullScreen(ref, eventData) {
  if (!ref.current) return;
  trackEvent("toggle_screen_size", eventData);
  if (ref.current.requestFullscreen) return ref.current.requestFullscreen();
  if (ref.current.webkitEnterFullScreen) return ref.current.webkitEnterFullScreen();
  if (ref.current.mozRequestFullScreen) return ref.current.mozRequestFullScreen();
  if (ref.current.msRequestFullscreen) return ref.current.msRequestFullscreen();
}

export default requestFullScreen;
