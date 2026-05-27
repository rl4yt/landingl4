export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'JSON inválido' }, 400);
  }

  const code = (body?.code || '').toString().trim().toUpperCase();
  if (!code) {
    return jsonResponse({ error: 'Código obrigatório' }, 400);
  }

  const validCodes = (process.env.JOHN_CODES || 'JOHN-2026-ALPHA,BRAVA-DEMO,L4-CLIENTE,ELENILSON')
    .split(',')
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean);

  if (!validCodes.includes(code)) {
    return jsonResponse({ error: 'Código inválido. Confirme com o Romell.' }, 401);
  }

  const secret = process.env.JOHN_SESSION_SECRET || 'l4-john-default-rotate-in-vercel';
  const expires = Math.floor(Date.now() / 1000) + 86400; // 24h
  const payload = `${code}:${expires}`;
  const sig = await hmac(payload, secret);
  const token = b64url(`${payload}:${sig}`);

  return new Response(JSON.stringify({ ok: true, code }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'set-cookie': `john_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=86400`,
      'cache-control': 'no-store',
    },
  });
}

function jsonResponse(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
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
