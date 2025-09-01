import { useEffect, useState } from "react";
import { withBasePath } from "./utils";

const IMAGE_REGEX = /\.(png|jpe?g|gif|webp)$/i;

export function useOgImage(url?: string) {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    if (!url) return;

    if (IMAGE_REGEX.test(url)) {
      setImage(url.startsWith("/") ? withBasePath(url) : url);
      return;
    }

    const controller = new AbortController();
    fetch(`/api/og-image?url=${encodeURIComponent(url)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data: { image?: string }) => {
        if (data?.image) setImage(data.image);
      })
      .catch(() => null);

    return () => controller.abort();
  }, [url]);

  return image;
}
