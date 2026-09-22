export async function onRequestPost(context) {
  try {
    const { tipo, modelo, username, tg_id, total } = await context.request.json();
    const BOT_TOKEN = context.env.BOT_TOKEN;
    const CANAL_ID = context.env.CANAL_ID || "-1004377732507";
    if (!BOT_TOKEN || !CANAL_ID) return new Response(JSON.stringify({ok:false}),{status:200});
    const msg = `${tipo==='BUENO'?'👍🏻':'👎🏻'} VOTO ${tipo}\n👑 ${modelo?.perfil} (@${modelo?.username})\n📊 Total: ${total}\n👤 ${username} ID:${tg_id}`;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:CANAL_ID,text:msg})});
    return new Response(JSON.stringify({ok:true}),{status:200});
  } catch(e){ return new Response(JSON.stringify({ok:false}),{status:200}); }
}
