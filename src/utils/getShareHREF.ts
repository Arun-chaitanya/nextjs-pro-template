export default function getShareHREF(social: string, url: string, text: string) {
  const escapedUrl = encodeURI(url);
  switch (social) {
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${escapedUrl}`;
    case "twitter":
      return `https://twitter.com/share?url=${escapedUrl}&text=${text}`;
    case "whatsapp":
      return `https://api.whatsapp.com/send?text=${escapedUrl}%0a${text}`;
    case "email":
      return `mailto:?subject=${text}&body=${url}`;
    default:
      return;
  }
}
