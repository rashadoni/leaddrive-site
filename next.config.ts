import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // This marketing site has no same-origin API or request-specific rendering.
  // Exporting it keeps HTML and 404 responses in Cloudflare Static Assets so a
  // page view (or a scanner probing an unknown URL) does not spend Worker CPU.
  output: 'export',
  // Serve metadata blocking (in <head>) for every user agent. Metadata here is instant,
  // and streamed metadata lands in <body>, which crawlers and Lighthouse do not read.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
