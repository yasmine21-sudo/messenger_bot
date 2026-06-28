// ============================================================
// BOT MESSENGER — El Medina Center 🏬
// Menu 100% gratuit, 0 token IA
// ============================================================
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// ============================================================
// DONNÉES DES MAGASINS PAR NIVEAU
// ============================================================
const MAGASINS = {
  "niveau -1": "🅿️ NIVEAU -1 : PARKING",
  "niveau 0": `🛍️ NIVEAU 0 :
MY ROSE & GLORY • BEKHCHI'S • OPTIKOS • AS CLOTHING
MY FINE & JEWELRY • NOUGAT ROYAL • SIDI MOULEY
CARREFOUR MARKET • PRODERMA • PIOVE`,
  "niveau 1": `👗 NIVEAU 1 :
PARFUMO • ORA • ELENA • SKECHERS • STEPMODE
SUGAR • DENTELLE NOIRE • LE PRINTEMPS`,
  "niveau 2": `🍔 NIVEAU 2 (Food Court & Plus) :
VORTEX • P'TIT BOU CHOU • P'TIT BON BON • HOCO
KAYA • FINJAN • LA ROTONDA • HOUSE OF BURGERS
CHECK'IN • MEGA PIZZA • CHECKINTASTIC • SOLO
THAISTY CROUSTY • CRUSTELLE`,
};

// Catalogue complet pour la recherche par nom de magasin
const CATALOGUE = [
  { nom: "my rose", niveau: 0, categorie: "Cosmétiques" },
  { nom: "glory", niveau: 0, categorie: "Cosmétiques" },
  { nom: "bekhchi", niveau: 0, categorie: "Food" },
  { nom: "optikos", niveau: 0, categorie: "Accessoires" },
  { nom: "as clothing", niveau: 0, categorie: "Mode" },
  { nom: "fine jewelry", niveau: 0, categorie: "Accessoires" },
  { nom: "jewelry", niveau: 0, categorie: "Accessoires" },
  { nom: "nougat royal", niveau: 0, categorie: "Food" },
  { nom: "sidi mouley", niveau: 0, categorie: "Divers" },
  { nom: "carrefour", niveau: 0, categorie: "Supermarché" },
  { nom: "proderma", niveau: 0, categorie: "Cosmétiques" },
  { nom: "piove", niveau: 0, categorie: "Cosmétiques" },
  { nom: "parfumo", niveau: 1, categorie: "Cosmétiques" },
  { nom: "ora", niveau: 1, categorie: "Mode" },
  { nom: "elena", niveau: 1, categorie: "Mode" },
  { nom: "skechers", niveau: 1, categorie: "Mode" },
  { nom: "stepmode", niveau: 1, categorie: "Mode" },
  { nom: "sugar", niveau: 1, categorie: "Mode" },
  { nom: "dentelle noire", niveau: 1, categorie: "Mode" },
  { nom: "dentelle", niveau: 1, categorie: "Mode" },
  { nom: "printemps", niveau: 1, categorie: "Mode" },
  { nom: "vortex", niveau: 2, categorie: "Loisirs" },
  { nom: "p'tit bou", niveau: 2, categorie: "Mode Enfant" },
  { nom: "ptit bou", niveau: 2, categorie: "Mode Enfant" },
  { nom: "p'tit bon", niveau: 2, categorie: "Food" },
  { nom: "ptit bon", niveau: 2, categorie: "Food" },
  { nom: "hoco", niveau: 2, categorie: "Accessoires" },
  { nom: "kaya", niveau: 2, categorie: "Culture & Éducation" },
  { nom: "finjan", niveau: 2, categorie: "Food" },
  { nom: "rotonda", niveau: 2, categorie: "Food" },
  { nom: "house of burger", niveau: 2, categorie: "Food" },
  { nom: "burger", niveau: 2, categorie: "Food" },
  { nom: "check'in", niveau: 2, categorie: "Food" },
  { nom: "checkin", niveau: 2, categorie: "Food" },
  { nom: "mega pizza", niveau: 2, categorie: "Food" },
  { nom: "pizza", niveau: 2, categorie: "Food" },
  { nom: "checkintastic", niveau: 2, categorie: "Food" },
  { nom: "solo", niveau: 2, categorie: "Food" },
  { nom: "thaisty", niveau: 2, categorie: "Food" },
  { nom: "thai", niveau: 2, categorie: "Food" },
  { nom: "crustelle", niveau: 2, categorie: "Food" },
  { nom: "crousty", niveau: 2, categorie: "Food" },
];

// ============================================================
// RÉPONSES FIXES
// ============================================================
const MSG = {
  bienvenue: `مرحبًا بك في المدينة سنتر 🏬

نحن هنا لمساعدتك على معرفة كل شيء عن المركز.
اختر أحد الخيارات أدناه 👇`,

  horaires: `🕘 ساعات العمل :
• من السبت إلى الخميس : 09:00 - 23:00
• الويكاند (الجمعة والسبت) : 09:00 - 00:00 منتصف الليل

نرحب بزيارتكم في أي وقت 😊`,

  parking: `🅿️ مواقف السيارات (Parking) :

يقع الباركينج في الجهة الخلفية من المدينة سنتر 🏬
• السعة : أكثر من 100 سيارة
• سعر التذكرة : 150 دج فقط

مرحبًا بكم ونتمنى لكم زيارة مريحة! 🚗`,

  localisation: `📍 موقع المركز :

يقع El Medina Center في موقع استراتيجي يسهل الوصول إليه.

🗺️ Google Maps :
https://maps.app.goo.gl/fcCRrLqtxcNBNpew8

نحن في انتظار زيارتكم 🏬`,

  categories: `🏷️ تصنيف المتاجر :

👗 MODE : Skechers • Le Printemps • P'tit Bou Chou • Sugar • Stepmode • AS Clothing • Dentelle Noire • Elena

💍 ACCESSOIRES : HOCO • Optikos • Fine Jewelry

💄 COSMÉTIQUES : My Rose & Glory • Piove • Parfumo

🎮 LOISIRS : Vortex

📚 Culture & Éducation : Kaya

🍔 FOOD COURT : Bekhchi's • Solo • Checkintastic • Mega Pizza • Check'in • House of Burgers • Rotanda • Finjan • Crustelle • Thaisty Crousty`,

  niveaux: `🏢 المتاجر حسب الطابق :

الطابق -1 : 🅿️ Parking
الطابق 0 : 🛍️ My Rose & Glory • Carrefour • Proderma...
الطابق 1 : 👗 Skechers • Elena • Le Printemps...
الطابق 2 : 🍔 Food Court & Loisirs

اكتب اسم الطابق (مثال: "الطابق 0") لمزيد من التفاصيل`,

  defaut: `شكرًا على رسالتك 🙏

يمكنني مساعدتك في:
• ⏰ ساعات العمل
• 🏪 موقع متجر معين
• 🅿️ الباركينج

اختر من القائمة أدناه 👇`,
};

// ============================================================
// RECHERCHE DE MAGASIN PAR NOM
// ============================================================
function rechercherMagasin(texte) {
  const t = texte.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "'");

  const trouve = CATALOGUE.find((m) => t.includes(m.nom.toLowerCase()));
  if (!trouve) return null;

  const niveauLabel = trouve.niveau === -1
    ? "NIVEAU -1 (Parking)"
    : `NIVEAU ${trouve.niveau}`;

  return `🔍 ${trouve.nom.toUpperCase()} se trouve au :

📍 ${niveauLabel}
🏷️ Catégorie : ${trouve.categorie}

${MAGASINS[`niveau ${trouve.niveau}`] || ""}

بالتوفيق في تسوقك! 🛍️`;
}

// ============================================================
// DÉTECTION D'INTENTION (arabe + français, 0 IA)
// ============================================================
function detecterIntention(texte) {
  const t = texte.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Salutations
  if (/مرحب|سلام|أهلا|اهلا|بوجور|bonjour|salam|ahlan|salut|hello|hi\b|بونجور/.test(t))
    return "salutations";

  // Horaires
  if (/ساع|وقت|يفتح|يغلق|متاح|horaire|heure|ouvert|ferm|disponible|عمل/.test(t))
    return "horaires";

  // Parking
  if (/باركينج|موقف|سيارة|parking|voiture|stationnement|park/.test(t))
    return "parking";

  // Localisation / Adresse
  if (/موقع|عنوان|كيف|وين|وصول|maps|localisation|adresse|comment|trouver|itineraire/.test(t))
    return "localisation";

  // Catégories
  if (/نوع|تصنيف|categorie|mode|cosmetique|food|loisir|علامة|ماركة/.test(t))
    return "categories";

  // Niveaux / étages
  if (/طابق|طوابق|niveau|etage|floor|-1|0|1|2/.test(t))
    return "niveaux";

  return null;
}

// ============================================================
// ENVOI DE MESSAGE SIMPLE
// ============================================================
async function envoyerMessage(recipientId, texte) {
  try {
    await axios.post(
      `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      { recipient: { id: recipientId }, message: { text: texte } }
    );
  } catch (err) {
    console.error("❌ Envoi:", err.response?.data || err.message);
  }
}

// ============================================================
// ENVOI DU MENU BOUTONS (Quick Replies)
// ============================================================
async function envoyerMenuBoutons(recipientId) {
  try {
    await axios.post(
      `https://graph.facebook.com/v20.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      {
        recipient: { id: recipientId },
        message: {
          text: "كيف يمكنني مساعدتك؟ 👇",
          quick_replies: [
            { content_type: "text", title: "⏰ ساعات العمل",   payload: "HORAIRES"     },
            { content_type: "text", title: "🏪 استفسار متجر",  payload: "MAGASIN"      },
            { content_type: "text", title: "🅿️ الباركينج",     payload: "PARKING"      },
            { content_type: "text", title: "📍 الموقع",        payload: "LOCALISATION" },
          ],
        },
      }
    );
  } catch (err) {
    console.error("❌ Boutons:", err.response?.data || err.message);
  }
}

// ============================================================
// ENVOI MESSAGE RECHERCHE MAGASIN
// ============================================================
async function demanderNomMagasin(recipientId) {
  await envoyerMessage(
    recipientId,
    `🔍 اكتب اسم المتجر الذي تريد معرفة موقعه\n(مثال: Skechers أو Carrefour أو Vortex)`
  );
}

// ============================================================
// SESSION — mémoriser l'état de chaque utilisateur
// ============================================================
const sessions = new Map(); // senderId → "recherche_magasin" | null

// ============================================================
// WEBHOOK — Vérification Meta
// ============================================================
app.get("/webhook", (req, res) => {
  const { "hub.mode": mode, "hub.verify_token": token, "hub.challenge": challenge } = req.query;
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook vérifié");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ============================================================
// WEBHOOK — Réception
// ============================================================
app.post("/webhook", async (req, res) => {
  const body = req.body;
  if (body.object !== "page") return res.sendStatus(404);
  res.sendStatus(200); // répondre immédiatement à Meta

  for (const entry of body.entry || []) {
    for (const event of entry.messaging || []) {
      const senderId = event.sender.id;

      // ── Clic sur bouton (Postback) ──────────────────────────
      if (event.postback) {
        const payload = event.postback.payload;
        sessions.delete(senderId); // reset état

        if (payload === "HORAIRES")     { await envoyerMessage(senderId, MSG.horaires);     await envoyerMenuBoutons(senderId); }
        else if (payload === "PARKING") { await envoyerMessage(senderId, MSG.parking);      await envoyerMenuBoutons(senderId); }
        else if (payload === "LOCALISATION") { await envoyerMessage(senderId, MSG.localisation); await envoyerMenuBoutons(senderId); }
        else if (payload === "MAGASIN") { sessions.set(senderId, "recherche_magasin");      await demanderNomMagasin(senderId); }
        else if (payload === "MENU" || payload === "GET_STARTED") {
          await envoyerMessage(senderId, MSG.bienvenue);
          await envoyerMenuBoutons(senderId);
        }
        continue;
      }

      // ── Message texte ───────────────────────────────────────
      if (!event.message?.text) continue;
      const texte = event.message.text.trim();

      // Étape 1 : si l'utilisateur est en mode recherche magasin
      if (sessions.get(senderId) === "recherche_magasin") {
        sessions.delete(senderId);
        const resultat = rechercherMagasin(texte);
        if (resultat) {
          await envoyerMessage(senderId, resultat);
        } else {
          await envoyerMessage(
            senderId,
            `😕 لم أجد "${texte}" في قائمة متاجرنا.\nتحقق من الاسم أو تواصل مع طاقم المركز للمساعدة.`
          );
        }
        await envoyerMenuBoutons(senderId);
        continue;
      }

      // Étape 2 : vérifier si c'est une recherche directe de magasin
      const resultatDirect = rechercherMagasin(texte);
      if (resultatDirect) {
        await envoyerMessage(senderId, resultatDirect);
        await envoyerMenuBoutons(senderId);
        continue;
      }

      // Étape 3 : détection d'intention par mots-clés
      const intention = detecterIntention(texte);
      switch (intention) {
        case "salutations":
          await envoyerMessage(senderId, MSG.bienvenue);
          await envoyerMenuBoutons(senderId);
          break;
        case "horaires":
          await envoyerMessage(senderId, MSG.horaires);
          await envoyerMenuBoutons(senderId);
          break;
        case "parking":
          await envoyerMessage(senderId, MSG.parking);
          await envoyerMenuBoutons(senderId);
          break;
        case "localisation":
          await envoyerMessage(senderId, MSG.localisation);
          await envoyerMenuBoutons(senderId);
          break;
        case "categories":
          await envoyerMessage(senderId, MSG.categories);
          await envoyerMenuBoutons(senderId);
          break;
        case "niveaux":
          // Détecter quel niveau
          const niveauMatch = texte.match(/-1|0|1|2/);
          if (niveauMatch) {
            const n = parseInt(niveauMatch[0]);
            const key = `niveau ${n}`;
            if (MAGASINS[key]) {
              await envoyerMessage(senderId, MAGASINS[key]);
            } else {
              await envoyerMessage(senderId, MSG.niveaux);
            }
          } else {
            await envoyerMessage(senderId, MSG.niveaux);
          }
          await envoyerMenuBoutons(senderId);
          break;
        default:
          // Aucune intention détectée → menu par défaut
          await envoyerMessage(senderId, MSG.defaut);
          await envoyerMenuBoutons(senderId);
      }
    }
  }
});

// ============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🏬 El Medina Center Bot — Port ${PORT}`));
