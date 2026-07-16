export const prerender = false;

export async function POST({ request }) {
  const { action, email, password } = await request.json();

  try {
    if (action === 'signup') {
      // In production: hash password, store in database
      // For demo: just validate
      if (!email || !password || password.length < 6) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid credentials' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          user: { email, id: 'user_' + Date.now() },
          token: 'token_' + Math.random().toString(36).substr(2, 9)
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'login') {
      // In production: verify password hash
      if (!email || !password) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid credentials' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          user: { email, id: 'user_123' },
          token: 'token_' + Math.random().toString(36).substr(2, 9)
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid action' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
