/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "yisol-idm-vton.hf.space"],
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint will not run during build
  },
};

export default nextConfig;
