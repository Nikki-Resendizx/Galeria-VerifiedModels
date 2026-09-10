// /api/comentario.js
export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { modelo, usuario, comentario } = req.body;

  const BOT_TOKEN = process.env.BOT_TOKEN; // tu token de @BotFather
  const CANAL_ID = process.env.CANAL_ID; // ej: -1001234567890 o @tu_canal_privado

  const texto = `
💬 *NUEVO COMENTARIO*

👑 *Modelo:* ${modelo.perfil} (@${modelo.username})
🆔 *Modelo ID:* \`${modelo.id}\`

👤 *Nombre:* ${usuario.nombre}
🔗 *Usuario:* ${usuario.username}
🆔 *ID Telegram:* \`${usuario.id}\`

💭 *Comentario:*
${comentario}

🔗 Perfil: https://t.me/galeriaVerifiedModels_Bot/Galeria?startapp=m_${modelo.id}
  `;

  try{
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        chat_id: CANAL_ID,
        text: texto,
        parse_mode: 'Markdown'
      })
    });
  }catch(e){ console.log(e); }

  return res.status(200).json({ok:true});
}
