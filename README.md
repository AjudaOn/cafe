# Cafe2026

## Ambiente de desenvolvimento e deploy

Este projeto e desenvolvido localmente em **Windows** com Vite + React, mas o destino de producao e uma VPS **Linux**.

Cuidados importantes:

- Use caminhos e imports com a mesma capitalizacao do nome real dos arquivos/pastas. Linux diferencia maiusculas e minusculas.
- Evite separadores de caminho especificos de Windows em codigo (`\\`). Prefira imports relativos normais e APIs multiplataforma.
- Use `pnpm` para instalar, validar e buildar.
- Antes de publicar, valide localmente:

```bash
pnpm typecheck
pnpm build:client
```

## Atualizar o GitHub pelo computador local

Use este fluxo quando alterar o conteudo do site localmente e quiser publicar no repositorio `AjudaOn/cafe`.

1. Confira se o remoto esta correto:

```bash
git remote -v
```

O esperado neste computador e:

```bash
origin  git@github-cafe:AjudaOn/cafe.git (fetch)
origin  git@github-cafe:AjudaOn/cafe.git (push)
```

2. Veja quais arquivos foram alterados:

```bash
git status --short --branch
```

3. Valide o projeto antes de subir:

```bash
pnpm typecheck
pnpm build:client
```

4. Crie o commit:

```bash
git add README.md client/App.tsx client/data.ts client/scenes/SceneEvent.tsx client/scenes/SceneGuest.tsx
git commit -m "Atualiza Cafe com Aner edicao XXX"
```

Se tiver outros arquivos alterados de proposito, adicione tambem. Evite usar `git add .` quando houver arquivos soltos ou temporarios.

5. Envie para o GitHub:

```bash
git push origin main
```

6. Confirme que local e GitHub estao sincronizados:

```bash
git status --short --branch
git log --oneline -1
```

Quando estiver tudo certo, o status deve mostrar `main...origin/main` sem `ahead`.

## Chave SSH deste projeto

Este computador usa uma deploy key exclusiva para o projeto Cafe:

```text
Host github-cafe
  HostName github.com
  User git
  IdentityFile C:\Users\vscode\.ssh\cafe_deploy_key
  IdentitiesOnly yes
```

No GitHub, essa chave precisa estar cadastrada em `AjudaOn/cafe` com **Allow write access** marcado.

Para testar a autenticacao:

```bash
ssh -T git@github-cafe
```

A resposta esperada e parecida com:

```text
Hi AjudaOn/cafe! You've successfully authenticated, but GitHub does not provide shell access.
```

## Atualizar na VPS

Use estes comandos na VPS, dentro da pasta do projeto:

```bash
cd /opt/cafe
git pull origin main
pnpm build
pm2 restart cafe --update-env
pm2 status
```

Se foram alteradas dependencias no `package.json` ou `pnpm-lock.yaml`, rode tambem:

```bash
pnpm install
```

antes do `pnpm build`.

Para conferir se a VPS puxou o commit certo:

```bash
git log --oneline -1
```

Para validar localmente na VPS:

```bash
curl -I http://localhost:3010
```

Para validar pelo dominio:

```bash
curl -I https://cafe.aner.org.br
```

## Recriar o processo PM2 se precisar

Use isto apenas se o processo `cafe` nao existir, estiver duplicado, ou a configuracao estiver quebrada:

```bash
pm2 delete all
cd /opt/cafe
git pull origin main
pnpm install
pnpm build
PORT=3010 pm2 start "pnpm start" --name cafe --update-env
pm2 save
pm2 status
```

## Checklist rapido de publicacao

No computador local:

```bash
pnpm typecheck
pnpm build:client
git add ARQUIVOS_ALTERADOS
git commit -m "Atualiza Cafe com Aner edicao XXX"
git push origin main
```

Na VPS:

```bash
cd /opt/cafe
git pull origin main
pnpm build
pm2 restart cafe --update-env
```
