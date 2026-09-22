export async function onRequestPost(context) {
  try {
    const { perfil, username } = await context.request.json();
    const BOT_TOKEN = context.env.BOT_TOKEN;
    const CANAL_ID = context.env.CANAL_ID;
    if (!BOT_TOKEN ||!CANAL_ID) return new Response(JSON.stringify({ok:false}),{status:200});
    const msg = `🆕 NUEVA MODELO ${perfil}\n👑 @${username}\n🔗 https://galeria-verifiedmodels.pages.dev`;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:CANAL_ID,text:msg})});
    return new Response(JSON.stringify({ok:true}),{status:200});
  } catch(e){ return new Response(JSON.stringify({ok:false}),{status:200}); }
}
