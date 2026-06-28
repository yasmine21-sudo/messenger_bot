# messengerbot

Bot Facebook Messenger base sur Cloudflare Workers pour El Medina Center.

## Structure

```text
messengerbot/
├── src/
│   ├── worker.js
│   ├── messenger.js
│   ├── menu.js
│   ├── intents.js
│   ├── catalog.js
│   ├── ai.js
│   └── utils.js
├── wrangler.toml
├── package.json
└── .gitignore
```

## Variables Cloudflare

Dans Cloudflare Workers > Settings > Variables, ajoutez :

- `PAGE_ACCESS_TOKEN`
- `VERIFY_TOKEN`
- `ANTHROPIC_API_KEY`

`ANTHROPIC_MODEL` est optionnelle si vous voulez surcharger le modele par defaut.

## Local

```bash
npm install
npm run dev
```

Pour le developpement local avec `wrangler dev`, vous pouvez creer un fichier `.dev.vars` non versionne :

```bash
PAGE_ACCESS_TOKEN=...
VERIFY_TOKEN=...
ANTHROPIC_API_KEY=...
```

## Deploiement

```bash
npm run deploy
```

URL du webhook a declarer dans Meta :

```text
https://messengerbot.<votre-sous-domaine>.workers.dev/webhook
```

## Comportement

- Detection par mots-cles pour les questions frequentes
- Recherche de magasin par nom
- Quick Replies et postbacks Messenger
- Sessions en memoire avec `Map()` pour un petit volume
- Fallback Claude uniquement si aucune reponse statique n'est trouvee
