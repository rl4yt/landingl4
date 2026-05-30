export const config = { runtime: 'edge' };

export default async function handler(req) {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'set-cookie': 'john_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
      'cache-control': 'no-store',
    },
  });
}
