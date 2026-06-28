#!/bin/bash
# ============================================================
# Configurer le menu permanent + bouton "Démarrer"
# Exécuter UNE SEULE FOIS après le déploiement
# ============================================================

TOKEN="TON_PAGE_ACCESS_TOKEN_ICI"

curl -X POST "https://graph.facebook.com/v20.0/me/messenger_profile" \
  -H "Content-Type: application/json" \
  -d '{
    "get_started": {
      "payload": "GET_STARTED"
    },
    "greeting": [
      {
        "locale": "default",
        "text": "مرحبًا بك في المدينة سنتر 🏬\nاضغط على ابدأ للحصول على المساعدة!"
      }
    ],
    "persistent_menu": [
      {
        "locale": "default",
        "composer_input_disabled": false,
        "call_to_actions": [
          { "type": "postback", "title": "🏠 القائمة الرئيسية",  "payload": "MENU"        },
          { "type": "postback", "title": "⏰ ساعات العمل",        "payload": "HORAIRES"    },
          { "type": "postback", "title": "🏪 استفسار عن متجر",   "payload": "MAGASIN"     },
          { "type": "postback", "title": "🅿️ الباركينج",          "payload": "PARKING"     },
          { "type": "postback", "title": "📍 الموقع على الخريطة", "payload": "LOCALISATION"}
        ]
      }
    ]
  }' \
  "https://graph.facebook.com/v20.0/me/messenger_profile?access_token=${TOKEN}"

echo ""
echo "✅ Menu permanent configuré !"
