import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const BASE_URL = "https://barrybeeauto.com"; // Choose/replace as needed
  const entries = [
    { path: "", priority: "1.0" },
    { path: "/about", priority: "0.8" },
    { path: "/services", priority: "0.9" },
    { path: "/cars", priority: "0.9" },
    { path: "/contact", priority: "0.7" },
  ];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...entries.map((e) => `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>weekly</changefreq><priority>${e.priority}</priority></url>`),
    `</urlset>`,
  ].join("\n");

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
