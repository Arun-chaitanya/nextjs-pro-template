export default function fileDownload(href, filename) {
  const link = document.createElement("a");
  link.href = href;
  link.target = "_blank";
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
