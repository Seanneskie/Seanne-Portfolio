import { useEffect, useState } from "react";
import { withBasePath } from "./utils";

const IMAGE_REGEX = /\.(png|jpe?g|gif|webp)$/i;

export function useOgImage(url?: string) {
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    if (IMAGE_REGEX.test(url)) {
      const isAbsolute = /^https?:\/\//.test(url);
      const normalized = isAbsolute
        ? url
        : withBasePath(url.startsWith("/") ? url : `/${url}`);
      setImage(normalized);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setImage(undefined);
    fetch(`/api/og-image?url=${encodeURIComponent(url)}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data: { image?: string }) => {
        if (data?.image) setImage(data.image);
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
