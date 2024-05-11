/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "",
  },
};

export default nextConfig;
