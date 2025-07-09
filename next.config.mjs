/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com','api.dicebear.com'], // ✅ allow Firebase image URLs
  },
};

export default withNextIntl(nextConfig);
