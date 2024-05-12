/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
      {
        protocol: "https",
        hostname: "dbdehqz6rw0l.cloudfront.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "image.mux.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
