/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
   reactStrictMode: true,
   compiler: {
      styledComponents: true,
   },
   images: {
      loader: "akamai",
      path: "",
   },
   assetPrefix: "https://andrewmvk.github.io/portfolio/",
};

module.exports = nextConfig;
