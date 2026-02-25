import { defaultLocale, locales } from '@/i18n/i18n';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
});

export const config = {
  matcher: ['/', '/(vi|en)/:path*/max-age=31536000'],
};
