# Orientacoes

## Executar o projeto localmente
1. Abrir o PowerShell e entrar na pasta do projeto:

```powershell
cd c:\Projetos2026\Cafe2026
```

2. Instalar dependencias (primeira vez):

```powershell
pnpm install
```

3. Iniciar a aplicacao:

```powershell
pnpm dev
```

4. Abrir no navegador:

`http://localhost:8080`

5. Para parar o servidor:

`Ctrl + C`

## Atualizar no GitHub (enviar alteracoes)
1. Verificar o que mudou:

```powershell
git status
```

2. Adicionar arquivos:

```powershell
git add .
```

3. Criar commit:

```powershell
git commit -m "Atualiza aplicacao"
```

4. Enviar para o GitHub:

```powershell
git push origin main
```

## Atualizar producao via GitHub
Fluxo padrao:
1. Fazer `git push origin main` (passos acima).
2. A plataforma de producao (ex: Vercel/Netlify/outro servidor) detecta o push.
3. Ela executa novo build e publica a versao mais recente automaticamente.

Se sua producao estiver em um servidor manual (sem deploy automatico), no servidor execute:

```bash
git pull origin main
pnpm install
pnpm build
pnpm start
```
