# Cafe2026

## Ambiente de desenvolvimento e deploy

Este projeto e desenvolvido localmente em **Windows** (Vite + React), mas o destino de producao e um servidor **Linux**.

Para evitar problemas na publicacao, mantenha estes cuidados:

- Use caminhos e imports com a mesma capitalizacao do nome real dos arquivos/pastas (Linux diferencia maiusculas e minusculas).
- Evite separadores de caminho especificos de Windows em codigo (`\\`); prefira imports relativos normais e APIs multiplataforma.
- Mantenha os scripts via `pnpm` e valide build/typecheck antes do deploy.
- Antes de subir para o servidor Linux, execute localmente:

```bash
pnpm typecheck
pnpm build
```

Se ambos passarem, a chance de problema de compatibilidade entre Windows e Linux cai bastante.

## Commit e push para o GitHub (local)

Fluxo recomendado para subir alteracoes deste projeto para o GitHub:

```bash
git status
git add -A
git commit -m "sua mensagem de commit"
git push origin main
```

Conferencias uteis:

```bash
git branch --show-current
git remote -v
git log --oneline -n 5
```

## Atualizacao no servidor Linux (producao com PM2)

Para atualizar a aplicacao publicada no servidor:

```bash
cd /opt/cafe
git pull origin main
git rev-parse --short HEAD
pnpm install
pnpm build
pm2 restart cafe --update-env
pm2 status
```

Se o processo `cafe` ainda nao existir no PM2:

```bash
cd /opt/cafe
git pull origin main
pnpm install
pnpm build
PORT=3010 pm2 start "pnpm start" --name cafe --update-env
pm2 save
pm2 status
```

## Rodar em modo dev no servidor (somente teste)

Use apenas para teste rapido. Em producao, prefira `pnpm build` + `pnpm start` via PM2.

```bash
cd /opt/cafe
git pull origin main
pkill -f "vite|pnpm dev" || true
nohup pnpm dev > /var/log/cafe-dev.log 2>&1 &
tail -n 120 /var/log/cafe-dev.log
```

## Validacao rapida

```bash
curl -I http://127.0.0.1:8080
curl -I https://cafe.aner.org.br
```

## Diagnostico quando o site nao atualiza

Se o dominio continuar mostrando versao antiga, siga esta ordem:

```bash
# 1) Confirmar commit e codigo local
cd /opt/cafe
git rev-parse --short HEAD
grep -n "const SCENES" client/App.tsx
grep -n "sceneKey" client/App.tsx

# 2) Ver para onde o Nginx esta apontando
nginx -T | grep -nE "server_name|cafe\.aner\.org\.br|proxy_pass|root"

# 3) Se Nginx servir arquivos estaticos (root /opt/cafe/dist), rebuild:
pnpm build
nginx -s reload

# 4) Se Nginx usar proxy_pass, reinicie somente o processo correto
pm2 restart cafe --update-env
pm2 status
```

Regra pratica:
- `root /opt/cafe/dist` no Nginx: precisa `pnpm build` para refletir mudancas.
- `proxy_pass` no Nginx: precisa reiniciar o processo Node/PM2 que atende a porta do upstream.
