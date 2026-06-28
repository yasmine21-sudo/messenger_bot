import { MAGASINS, MSG, rechercherMagasin } from "./catalog.js";
import { genererReponseIA } from "./ai.js";
import { detecterIntention } from "./intents.js";
import { demanderNomMagasin, envoyerMenuBoutons, envoyerMessage } from "./messenger.js";
import { extractLevel, jsonResponse } from "./utils.js";

const WEBHOOK_PATH = "/webhook";
const sessions = new Map();

async function envoyerBienvenue(env, senderId) {
  await envoyerMessage(env, senderId, MSG.bienvenue);
  await envoyerMenuBoutons(env, senderId);
}

async function gererPayload(senderId, payload, env) {
  sessions.delete(senderId);

  switch (payload) {
    case "HORAIRES":
      await envoyerMessage(env, senderId, MSG.horaires);
      await envoyerMenuBoutons(env, senderId);
      return;
    case "PARKING":
      await envoyerMessage(env, senderId, MSG.parking);
      await envoyerMenuBoutons(env, senderId);
      return;
    case "LOCALISATION":
      await envoyerMessage(env, senderId, MSG.localisation);
      await envoyerMenuBoutons(env, senderId);
      return;
    case "MAGASIN":
      sessions.set(senderId, "recherche_magasin");
      await demanderNomMagasin(env, senderId, MSG.demandeMagasin);
      return;
    case "MENU":
    case "GET_STARTED":
      await envoyerBienvenue(env, senderId);
      return;
    default:
      await envoyerMessage(env, senderId, MSG.defaut);
      await envoyerMenuBoutons(env, senderId);
  }
}

async function gererRechercheNiveau(senderId, texte, env) {
  const niveau = extractLevel(texte);
  const cle = niveau === null ? null : `niveau ${niveau}`;

  if (cle && MAGASINS[cle]) {
    await envoyerMessage(env, senderId, MAGASINS[cle]);
  } else {
    await envoyerMessage(env, senderId, MSG.niveaux);
  }

  await envoyerMenuBoutons(env, senderId);
}

async function gererMessageTexte(senderId, texte, env) {
  if (sessions.get(senderId) === "recherche_magasin") {
    sessions.delete(senderId);
    const resultat = rechercherMagasin(texte);

    await envoyerMessage(
      env,
      senderId,
      resultat || MSG.magasinIntrouvable(texte),
    );
    await envoyerMenuBoutons(env, senderId);
    return;
  }

  const resultatDirect = rechercherMagasin(texte);
  if (resultatDirect) {
    await envoyerMessage(env, senderId, resultatDirect);
    await envoyerMenuBoutons(env, senderId);
    return;
  }

  const intention = detecterIntention(texte);
  switch (intention) {
    case "salutations":
      await envoyerBienvenue(env, senderId);
      return;
    case "horaires":
      await envoyerMessage(env, senderId, MSG.horaires);
      await envoyerMenuBoutons(env, senderId);
      return;
    case "parking":
      await envoyerMessage(env, senderId, MSG.parking);
      await envoyerMenuBoutons(env, senderId);
      return;
    case "localisation":
      await envoyerMessage(env, senderId, MSG.localisation);
      await envoyerMenuBoutons(env, senderId);
      return;
    case "categories":
      await envoyerMessage(env, senderId, MSG.categories);
      await envoyerMenuBoutons(env, senderId);
      return;
    case "niveaux":
      await gererRechercheNiveau(senderId, texte, env);
      return;
    case "magasin":
      sessions.set(senderId, "recherche_magasin");
      await demanderNomMagasin(env, senderId, MSG.demandeMagasin);
      return;
    default:
      break;
  }

  try {
    const reponseIA = await genererReponseIA(texte, env);
    if (reponseIA) {
      await envoyerMessage(env, senderId, reponseIA);
      await envoyerMenuBoutons(env, senderId);
      return;
    }
  } catch (error) {
    console.error("IA fallback error:", error);
  }

  await envoyerMessage(env, senderId, MSG.defaut);
  await envoyerMenuBoutons(env, senderId);
}

async function traiterWebhook(body, env) {
  for (const entry of body.entry || []) {
    for (const event of entry.messaging || []) {
      const senderId = event.sender?.id;
      if (!senderId) {
        continue;
      }

      if (event.postback?.payload) {
        await gererPayload(senderId, event.postback.payload, env);
        continue;
      }

      if (event.message?.quick_reply?.payload) {
        await gererPayload(senderId, event.message.quick_reply.payload, env);
        continue;
      }

      if (event.message?.text) {
        await gererMessageTexte(senderId, event.message.text.trim(), env);
      }
    }
  }
}

function verifierWebhook(request, env) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === env.VERIFY_TOKEN) {
    return new Response(challenge || "", { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return jsonResponse({
        service: "messengerbot",
        status: "ok",
        webhook: WEBHOOK_PATH,
      });
    }

    if (url.pathname !== WEBHOOK_PATH) {
      return new Response("Not Found", { status: 404 });
    }

    if (request.method === "GET") {
      return verifierWebhook(request, env);
    }

    if (request.method === "POST") {
      let body;

      try {
        body = await request.json();
      } catch {
        return new Response("Invalid JSON", { status: 400 });
      }

      if (body.object !== "page") {
        return new Response("Not Found", { status: 404 });
      }

      ctx.waitUntil(traiterWebhook(body, env));
      return new Response("OK", { status: 200 });
    }

    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        Allow: "GET, POST",
      },
    });
  },
};
