/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ["https://api.aroundme.co.in/", "aroundme-assets-v1.s3.amazonaws.com"],
    },
    env: {
      API_KEY: "https://api.aroundme.co.in/",
    }
}

export default nextConfig;
