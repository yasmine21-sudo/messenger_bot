import { normalizeText } from "./utils.js";

export const MAGASINS = {
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

export const CATALOGUE = [
  { nom: "my rose", niveau: 0, categorie: "Cosmetiques" },
  { nom: "glory", niveau: 0, categorie: "Cosmetiques" },
  { nom: "bekhchi", niveau: 0, categorie: "Food" },
  { nom: "optikos", niveau: 0, categorie: "Accessoires" },
  { nom: "as clothing", niveau: 0, categorie: "Mode" },
  { nom: "fine jewelry", niveau: 0, categorie: "Accessoires" },
  { nom: "jewelry", niveau: 0, categorie: "Accessoires" },
  { nom: "nougat royal", niveau: 0, categorie: "Food" },
  { nom: "sidi mouley", niveau: 0, categorie: "Divers" },
  { nom: "carrefour", niveau: 0, categorie: "Supermarche" },
  { nom: "proderma", niveau: 0, categorie: "Cosmetiques" },
  { nom: "piove", niveau: 0, categorie: "Cosmetiques" },
  { nom: "parfumo", niveau: 1, categorie: "Cosmetiques" },
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
  { nom: "kaya", niveau: 2, categorie: "Culture & Education" },
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

export const MSG = {
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

💄 COSMETIQUES : My Rose & Glory • Piove • Parfumo

🎮 LOISIRS : Vortex

📚 Culture & Education : Kaya

🍔 FOOD COURT : Bekhchi's • Solo • Checkintastic • Mega Pizza • Check'in • House of Burgers • Rotanda • Finjan • Crustelle • Thaisty Crousty`,

  niveaux: `🏢 المتاجر حسب الطابق :

الطابق -1 : 🅿️ Parking
الطابق 0 : 🛍️ My Rose & Glory • Carrefour • Proderma...
الطابق 1 : 👗 Skechers • Elena • Le Printemps...
الطابق 2 : 🍔 Food Court & Loisirs

اكتب اسم الطابق (مثال: "الطابق 0") لمزيد من التفاصيل`,

  demandeMagasin: `🔍 اكتب اسم المتجر الذي تريد معرفة موقعه
(مثال: Skechers أو Carrefour أو Vortex)`,

  magasinIntrouvable: (texte) => `😕 لم أجد "${texte}" في قائمة متاجرنا.
تحقق من الاسم أو تواصل مع طاقم المركز للمساعدة.`,

  defaut: `شكرًا على رسالتك 🙏

يمكنني مساعدتك في:
• ⏰ ساعات العمل
• 🏪 موقع متجر معين
• 🅿️ الباركينج

اختر من القائمة أدناه 👇`,
};

export function rechercherMagasin(texte) {
  const normalise = normalizeText(texte);
  const trouve = CATALOGUE.find((magasin) => normalise.includes(magasin.nom.toLowerCase()));

  if (!trouve) {
    return null;
  }

  const niveauLabel =
    trouve.niveau === -1 ? "NIVEAU -1 (Parking)" : `NIVEAU ${trouve.niveau}`;

  return `🔍 ${trouve.nom.toUpperCase()} se trouve au :

📍 ${niveauLabel}
🏷️ Categorie : ${trouve.categorie}

${MAGASINS[`niveau ${trouve.niveau}`] || ""}

بالتوفيق في تسوقك! 🛍️`;
}
