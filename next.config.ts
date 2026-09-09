import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Serve metadata blocking (in <head>) for every user agent. Metadata here is instant,
  // and streamed metadata lands in <body>, which crawlers and Lighthouse do not read.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
