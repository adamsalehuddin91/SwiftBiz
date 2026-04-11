# Qalbu n8n Setup

## 1. Import Workflow
n8n dashboard → **Import from file** → pilih `qalbu-ingest-workflow.json`

## 2. Set Environment Variables (dalam n8n Settings → Variables)
```
QALBU_API_URL   = https://api.qalbu.yourdomain.com
QALBU_N8N_TOKEN = (sama dengan N8N_INGEST_TOKEN dalam Laravel .env)
```

## 3. Add Gemini Credentials
n8n → Credentials → New → **Google Gemini API**
- Paste Google AI Studio API key

## 4. Webhook URL (untuk Telegram push)
Selepas activate workflow, copy webhook URL:
```
https://your-n8n.domain.com/webhook/qalbu-ingest
```
Guna URL ni dalam Telegram Bot untuk push content.

## 5. Test Manual
- Buka workflow → klik **Execute Workflow**
- Check Laravel: `php artisan tinker --execute="echo App\Models\Wisdom::count();"`

## Flow
```
[Cron 6jam] → [RSS MuftiWP] → [Normalize] → [Gemini AI] → [Parse+Hash] → [POST Laravel] → [Log]
[Webhook]   ──────────────────────────────────────────────────────────────────────────────────────↗
```
