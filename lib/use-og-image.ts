import { useEffect, useState } from "react";
import { withBasePath } from "./utils";

const IMAGE_REGEX = /\.(png|jpe?g|gif|webp)$/i;

export function useOgImage(url?: string) {
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    if (IMAGE_REGEX.test(url)) {
      setImage(url.startsWith("/") ? withBasePath(url) : url);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setImage(undefined);
    fetch(`https://r.jina.ai/${url}`, {
      signal: controller.signal,
    })
      .then((res) => res.text())
      .then((html) => {
        const match =
          html.match(/<meta[^>]+property=['"]og:image['"][^>]*content=['"]([^'"]+)['"]/i) ||
          html.match(/<meta[^>]+content=['"]([^'"]+)['"][^>]*property=['"]og:image['"]/i);
        let ogImage = match ? match[1] : undefined;
        if (ogImage) {
          if (ogImage.startsWith("//")) {
            ogImage = "https:" + ogImage;
          } else if (ogImage.startsWith("/")) {
            const urlObj = new URL(url);
            ogImage = urlObj.origin + ogImage;
          }
          setImage(ogImage);
        }
      })
      .catch(() => null)
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
      setLoading(false);
    };
  }, [url]);

  return { image, loading };
}
