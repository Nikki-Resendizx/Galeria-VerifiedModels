// /api/comentario.js - AVISO DE NUEVO COMENTARIO AL CANAL PRIVADO
export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { modelo, usuario, comentario } = req.body;

    if (!modelo || !usuario || !comentario) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CANAL_ID = process.env.CANAL_ID; // -100xxxxxxxxxx

    if (!BOT_TOKEN || !CANAL_ID) {
      console.log('Falta BOT_TOKEN o CANAL_ID');
      return res.status(200).json({ ok: true, warn: 'No env vars' });
    }

    const texto = `💬 *NUEVO COMENTARIO EN GALERÍA*

👑 *Modelo:* ${modelo.perfil} (@${modelo.username})
🆔 *Modelo ID:* \`${modelo.id}\`

👤 *Nombre:* ${usuario.nombre || 'Sin nombre'}
🔗 *Usuario:* ${usuario.username}
🆔 *ID Telegram:* \`${usuario.id}\`

💭 *Comentario:*
_${comentario}_

🔗 *Ver perfil:*
https://t.me/galeriaVerifiedModels_Bot/Galeria?startapp=m_${modelo.id}

⏰ ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CANAL_ID,
        text: texto,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      })
    });

    return res.status(200).json({ ok: true });

  } catch (e) {
    console.error(e);
    return res.status(200).json({ ok: false, error: e.message });
  }
}
