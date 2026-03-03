# Cafe2026

## Ambiente de desenvolvimento e deploy

Este projeto é desenvolvido localmente em **Windows** (Vite + React), mas o destino de produção é um servidor **Linux**.

Para evitar problemas na publicação, mantenha estes cuidados:

- Use caminhos e imports com a mesma capitalização do nome real dos arquivos/pastas (Linux diferencia maiúsculas e minúsculas).
- Evite separadores de caminho específicos de Windows em código (`\\`); prefira imports relativos normais e APIs multiplataforma.
- Mantenha os scripts via `pnpm` e valide build/typecheck antes do deploy.
- Antes de subir para o servidor Linux, execute localmente:

```bash
pnpm typecheck
pnpm build
```

Se ambos passarem, a chance de problema de compatibilidade entre Windows e Linux cai bastante.

## Atualizacao no servidor Linux

Para atualizar a aplicacao publicada no servidor:

```bash
cd /opt/cafe
git pull origin main
pnpm install
pnpm build
pm2 restart cafe --update-env
pm2 status
```

Para garantir que rode apenas uma instancia do app:

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

Validacao rapida:

```bash
curl -I https://cafe.aner.org.br
```
