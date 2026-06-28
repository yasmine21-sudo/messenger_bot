export function normalizeText(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’`´]/g, "'")
    .trim();
}

export function extractLevel(text = "") {
  const match = normalizeText(text).match(/(?:^|[^\d-])(-1|0|1|2)(?:[^\d]|$)/);
  return match ? Number(match[1]) : null;
}

export function jsonResponse(payload, init = {}) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}
