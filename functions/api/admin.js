const enc=new TextEncoder();
async function hmac(key,data){return crypto.subtle.sign("HMAC",key,enc.encode(data));}
function hex(buf){return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");}
async function keyFromRaw(raw){return crypto.subtle.importKey("raw",raw,{name:"HMAC",hash:"SHA-256"},false,["sign"]);}
export async function onRequestPost(context){
  try{
    const body=await context.request.json(), initData=String(body.initData||"");
    const token=context.env.BOT_TOKEN, admins=String(context.env.ADMIN_IDS||"").split(",").map(x=>x.trim()).filter(Boolean);
    if(!token||!initData)return new Response(JSON.stringify({ok:false,error:"No autorizado"}),{status:401});
    const p=new URLSearchParams(initData), hash=p.get("hash"); if(!hash)return new Response(JSON.stringify({ok:false,error:"Firma ausente"}),{status:401});
    const pairs=[...p.entries()].filter(([k])=>k!=="hash").sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>k+"="+v).join("\n");
    const secret=await hmac(await keyFromRaw(enc.encode("WebAppData")),token);
    const actual=hex(await hmac(await keyFromRaw(new Uint8Array(secret)),pairs));
    if(actual!==hash)return new Response(JSON.stringify({ok:false,error:"Firma inválida"}),{status:401});
    const user=JSON.parse(p.get("user")||"{}"), id=String(user.id||"");
    if(!admins.includes(id))return new Response(JSON.stringify({ok:false,error:"Administrador no autorizado"}),{status:403});
    return new Response(JSON.stringify({ok:true,user:{id,user:user.username||""}}),{headers:{"Content-Type":"application/json","Cache-Control":"no-store"}});
  }catch(e){return new Response(JSON.stringify({ok:false,error:"Solicitud inválida"}),{status:400});}
}