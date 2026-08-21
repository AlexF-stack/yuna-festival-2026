/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "festivalyuna.com" }],
        destination: "https://www.festivalyuna.com/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "festivalyuna.com" }],
        destination: "https://www.festivalyuna.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "yunafestival.com" }],
        destination: "https://www.festivalyuna.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.yunafestival.com" }],
        destination: "https://www.festivalyuna.com/:path*",
        permanent: true,
      },
      {
        source: "/don",
        destination: "/soutenir",
        permanent: true,
      },
      {
        source: "/boutique",
        destination: "/",
        permanent: true,
      },
      {
        source: "/partenaire",
        destination: "/partenaires",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
