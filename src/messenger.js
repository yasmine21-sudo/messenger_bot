import { buildPersistentMenuProfile, buildQuickReplies, MAIN_MENU_TEXT } from "./menu.js";

const GRAPH_API_VERSION = "v20.0";

async function postToFacebook(path, env, payload) {
  if (!env.PAGE_ACCESS_TOKEN) {
    throw new Error("Missing PAGE_ACCESS_TOKEN");
  }

  const response = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${path}?access_token=${encodeURIComponent(env.PAGE_ACCESS_TOKEN)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Facebook API error ${response.status}: ${errorText}`);
  }
}

export async function envoyerMessage(env, recipientId, texte) {
  await postToFacebook("me/messages", env, {
    recipient: { id: recipientId },
    message: { text: texte },
  });
}

export async function envoyerMenuBoutons(env, recipientId) {
  await postToFacebook("me/messages", env, {
    recipient: { id: recipientId },
    message: {
      text: MAIN_MENU_TEXT,
      quick_replies: buildQuickReplies(),
    },
  });
}

export async function demanderNomMagasin(env, recipientId, texte) {
  await envoyerMessage(env, recipientId, texte);
}

export async function configurerMenuPermanent(env) {
  await postToFacebook("me/messenger_profile", env, buildPersistentMenuProfile());
}
