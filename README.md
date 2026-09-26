# Galeria VerifiedModels — WebApp

## Cambios
- Panel admin con validación Telegram WebApp en `/api/admin`.
- Validación y límites de payload en las Functions.
- Borrado de modelos con limpieza de `votos` y `comentarios`.
- Reset de votos con limpieza de votos individuales.
- `createdAt` como fecha de creación, manteniendo `fecha` por compatibilidad.
- Comentarios limitados a 500 caracteres.
- Cabeceras de seguridad para Cloudflare Pages.

## Variables de entorno
- `BOT_TOKEN`: token del bot.
- `CANAL_ID`: chat/canal de avisos; por defecto `-1004377732507`.
- `ADMIN_IDS`: IDs de Telegram de administradores separados por comas.

## Arquitectura
Firebase mantiene datos de modelos y votos. Las fotografías del bot deben permanecer en Telegram Store Topics y mantenerse separadas de las fotografías propias de la WebApp.
