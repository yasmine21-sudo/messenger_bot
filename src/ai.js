const DEFAULT_ANTHROPIC_MODEL = "claude-3-5-haiku-latest";

export async function genererReponseIA(message, env) {
  if (!env.ANTHROPIC_API_KEY) {
    return null;
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: env.ANTHROPIC_MODEL || DEFAULT_ANTHROPIC_MODEL,
      max_tokens: 220,
      temperature: 0.2,
      system:
        "Tu es l'assistant Messenger de El Medina Center. Reponds en arabe ou en francais selon la langue du client. Sois bref, utile, et ne parle que du centre commercial, des magasins, des horaires, du parking, de la localisation ou des services. Si tu n'es pas sur, invite poliment l'utilisateur a contacter l'accueil.",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const texte = (data.content || [])
    .filter((bloc) => bloc.type === "text")
    .map((bloc) => bloc.text)
    .join("\n")
    .trim();

  return texte || null;
}
