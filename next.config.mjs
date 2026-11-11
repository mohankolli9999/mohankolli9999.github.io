/** @type {import('next').NextConfig} */
// Static export for GitHub Pages at the root domain (user page), so no basePath.
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
