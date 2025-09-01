import { NextRequest, NextResponse } from "next/server";

// Mark the route as static so it can be used with `output: export`.
export const dynamic = "force-static";

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("url");
  if (!target) {
    return NextResponse.json({ image: null }, { status: 400 });
  }

  try {
    const res = await fetch(target);
    const html = await res.text();
    const match = html.match(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    let image = match ? match[1] : null;
    if (image) {
      if (image.startsWith("//")) {
        image = "https:" + image;
      } else if (image.startsWith("/")) {
        const urlObj = new URL(target);
        image = urlObj.origin + image;
      }
    }
    return NextResponse.json({ image });
  } catch {
    return NextResponse.json({ image: null }, { status: 200 });
  }
}
