import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits plain HTML/CSS/JS into ./out. There is no server side to this site
  // any more — the contact form posts straight to Web3Forms — so a static
  // export deploys to Cloudflare Pages as files, with no Workers runtime and
  // no adapter in between.
  output: "export",

  // Next's image optimiser needs a server. Every image here is already a plain
  // <img>, so this only makes the constraint explicit.
  images: { unoptimized: true },

  // Emit about/index.html rather than about.html, which is what static hosts
  // expect when serving /about with no extension.
  trailingSlash: true,
};

export default nextConfig;
