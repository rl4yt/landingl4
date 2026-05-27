# Como fazer deploy de uma mudança

## Contexto

Dois apps vivem neste repositório, ambos deployados na Vercel:

| App | Pasta | URL |
|-----|-------|-----|
| Landing + agentes IA (Next.js) | raiz | `landingl4.vercel.app` |
| Painel do cliente (HTML estático) | `gestao-app/` | `gestaol4.vercel.app` |

**O painel do cliente é o mais editado.** O arquivo principal é:
```
gestao-app/app/index.html   ← tela principal do cliente (Documentos, Pipeline, etc.)
gestao-app/index.html       ← Base de Dados (upload de arquivos)
gestao-app/john/            ← portal do consultor L4
```

Deploy é automático: **qualquer push na branch `main` dispara o deploy na Vercel.**

---

## Passo a passo para fazer uma mudança

### 1. Leia o arquivo antes de editar

Sempre leia o trecho relevante antes de editar. O `gestao-app/app/index.html` tem ~7500 linhas — use Grep para localizar o que precisa.

```
# Exemplos de busca
Grep "renderDocumentos"        → encontra a função de render da aba Documentos
Grep "upload-grid"             → encontra onde os cards são montados
Grep "showPreviewModal"        → encontra o modal de preview
```

### 2. Faça o edit cirúrgico

**Regra principal: não mude o que não foi pedido.** Só adicione ou altere o trecho exato solicitado.

Use a ferramenta `Edit` com `old_string` e `new_string`. Se o trecho não for único no arquivo, adicione mais contexto ao `old_string`.

### 3. Commit e push

```bash
cd "/c/Users/ianma/OneDrive/Documentos/landingl4"

git add gestao-app/app/index.html   # ou o arquivo que você editou

git commit -m "feat: descrição do que mudou"

git push origin main
```

A Vercel detecta o push e faz deploy automático em ~1 minuto.

### 4. Verifique no ar

URL do painel: `https://gestaol4.vercel.app/app`

Para testar a aba Documentos com uma obra real:
```
https://gestaol4.vercel.app/app#documentos/f47d6dc4-8f8f-49e5-8fe8-c91264da9394
```

---

## Supabase

O banco é `aibemaisphshawlcozyf` (Supabase MCP disponível).

Tabela principal de documentos: `l4_documentos_obra`

| Campo | Descrição |
|-------|-----------|
| `project_id` | UUID da obra |
| `tipo` | `orcamento`, `cronograma`, `boletim_medicao`, `nota_fiscal` |
| `versao` | inteiro, incrementa por tipo |
| `status` | `processando` → `aguardando_preview` → `processado` / `erro` / `rejeitado_preview` |
| `ia_output` | JSON com dados extraídos pela IA (disponível em `aguardando_preview`) |
| `nome_arquivo_original` | nome original do arquivo |
| `storage_path` | caminho no bucket `documentos-obra` |

Para ver os docs de uma obra:
```sql
SELECT id, tipo, versao, status, nome_arquivo_original, created_at
FROM l4_documentos_obra
WHERE project_id = 'f47d6dc4-8f8f-49e5-8fe8-c91264da9394'
ORDER BY created_at DESC;
```

---

## Coisas que NÃO fazer

- Não chame o VPS diretamente em uploads — o trigger do Supabase já dispara o n8n
- Não mude o visual/layout sem ser pedido — só adicione funcionalidade
- Não mexa em `gestao-app/john/` sem contexto — é o portal do consultor L4
- Não faça push em outra branch — o deploy só acontece na `main`

---

## Rollback de emergência

Se algo quebrou em produção:

**Via Vercel (mais rápido):** Dashboard → projeto → Deployments → deploy anterior → "Promote to Production"

**Via Git:**
```bash
git revert HEAD
git push origin main
```
