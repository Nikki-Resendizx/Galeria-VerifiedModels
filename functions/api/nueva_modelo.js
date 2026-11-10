export async function onRequestPost(context) {
  try {
    const { perfil, username, id } = await context.request.json();
    const BOT_TOKEN = context.env.BOT_TOKEN;
    const CANAL_ID = context.env.CANAL_ID;
    if (!BOT_TOKEN || !CANAL_ID || !id) {
      return new Response(JSON.stringify({ ok: false }), { status: 200 });
    }

    const perfilSeguro = String(perfil || "").slice(0, 150);
    const usernameSeguro = String(username || "").replace(/^@/, "").slice(0, 80);
    const perfilUrl = `https://t.me/GaleriaVerifiedModels_bot/Galeria?startapp=m_${encodeURIComponent(String(id))}`;
    const msg = `🆕 NUEVA MODELO ${perfilSeguro}\n👑 @${usernameSeguro}\n🔗 ${perfilUrl}`;

    const telegram = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CANAL_ID, text: msg, disable_web_page_preview: true })
    });

    if (!telegram.ok) return new Response(JSON.stringify({ ok: false }), { status: 502 });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 200 });
  }
}
