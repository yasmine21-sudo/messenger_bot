import { normalizeText } from "./utils.js";

const INTENT_PATTERNS = [
  { intent: "salutations", pattern: /مرحب|سلام|أهلا|اهلا|بوجور|bonjour|salam|ahlan|salut|hello|hi\b|بونجور/ },
  { intent: "horaires", pattern: /ساع|وقت|يفتح|يغلق|متاح|horaire|heure|ouvert|ferm|disponible|عمل/ },
  { intent: "parking", pattern: /باركينج|موقف|سيارة|parking|voiture|stationnement|park/ },
  { intent: "localisation", pattern: /موقع|عنوان|كيف|وين|وصول|maps|localisation|adresse|comment|trouver|itineraire/ },
  { intent: "categories", pattern: /نوع|تصنيف|categorie|mode|cosmetique|food|loisir|علامة|ماركة/ },
  { intent: "niveaux", pattern: /طابق|طوابق|niveau|etage|floor|-1|0|1|2/ },
  { intent: "magasin", pattern: /متجر|محل|مغازه|magasin|boutique|store|shop/ },
];

export function detecterIntention(texte) {
  const normalise = normalizeText(texte);
  const match = INTENT_PATTERNS.find(({ pattern }) => pattern.test(normalise));
  return match ? match.intent : null;
}
