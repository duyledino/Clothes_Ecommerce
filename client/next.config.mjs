/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "yisol-idm-vton.hf.space"],
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint will not run during build
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://ec2-13-214-183-109.ap-southeast-1.compute.amazonaws.com:4000/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
