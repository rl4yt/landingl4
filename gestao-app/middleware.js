export const config = {
  matcher: ['/private/:path*', '/john/app/install', '/john/app/install.html'],
};

export default async function middleware(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/(?:^|;\s*)john_session=([^;]+)/);
  const token = match ? match[1] : null;

  if (!(await verifySession(token))) {
    const url = new URL(request.url);
    const loginUrl = new URL('/john/app/', url.origin);
    loginUrl.searchParams.set('redirect', url.pathname + url.search);
    return Response.redirect(loginUrl, 302);
  }
}

async function verifySession(token) {
  if (!token) return false;
  try {
    const decoded = atob(b64urlToB64(token));
    const parts = decoded.split(':');
    if (parts.length !== 3) return false;
    const [code, expiresStr, sig] = parts;
    const expires = parseInt(expiresStr, 10);
    if (!Number.isFinite(expires) || Date.now() / 1000 > expires) return false;

    const secret = process.env.JOHN_SESSION_SECRET || 'l4-john-default-rotate-in-vercel';
    const expectedSig = await hmac(`${code}:${expiresStr}`, secret);
    return constantTimeEqual(sig, expectedSig);
  } catch {
    return false;
  }
}

async function hmac(message, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return b64url(String.fromCharCode(...new Uint8Array(sig)));
}

function b64url(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlToB64(str) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return s;
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
