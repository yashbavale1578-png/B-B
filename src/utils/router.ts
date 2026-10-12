export const VALID_ROUTES = new Set([
  'home',
  'menu',
  'order',
  'reservations',
  'table-qr',
  'events',
  'loyalty',
  'promotions',
  'gallery',
  'story',
  'contact',
  'account',
  'login',
  'login/customer',
  'login/staff',
  'login/maintenance',
  'demo',
  'staff-portal',
  'mgmt-portal',
  'maint-portal'
]);

export function parseRouteFromLocation(): { route: string; isValid: boolean } {
  let raw = window.location.hash.replace(/^#\/?/, '').trim();
  if (!raw) {
    const pathname = window.location.pathname.replace(/^\//, '').trim();
    if (pathname && pathname !== 'index.html') {
      raw = pathname;
    }
  }

  if (!raw || raw === '/' || raw === 'home' || raw === 'index.html') {
    return { route: 'home', isValid: true };
  }

  const cleanRoute = raw.split('?')[0].split('#')[0].replace(/\/+$/, '');
  if (VALID_ROUTES.has(cleanRoute)) {
    return { route: cleanRoute, isValid: true };
  }

  return { route: cleanRoute, isValid: false };
}
