export default function loadScript(src, id) {
  return new Promise<boolean>((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(`script#${id}`);
    if (script) return resolve(true);
    script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.onload = () => resolve(true);
    script.onerror = () => reject(false);
    document.body.append(script);
  });
}
