# Vertical Fire — Site Institucional

Site institucional da Vertical Fire, empresa especializada em treinamentos de Segurança do Trabalho, Combate a Incêndio, Trabalho em Altura e Resgate Industrial.

## Estrutura

```
vertical-fire/
├── index.html          ← Página principal (single-page)
├── css/
│   └── style.css       ← Design system completo
├── js/
│   └── main.js         ← Interatividade (menu, FAQ, form, animações)
├── images/
│   ├── logo.png
│   ├── incendio-noturno.jpg
│   ├── team.jpg
│   ├── altura.jpg
│   ├── resgate.jpg
│   ├── instrutor.jpg
│   ├── instrutor2.jpg
│   ├── equipamentos.jpg
│   └── hero-worker.jpg
└── README.md
```

## Deploy no GitHub Pages

1. Crie um repositório no GitHub (ex: `vertical-fire`)
2. Suba todos os arquivos:
   ```bash
   git init
   git add .
   git commit -m "feat: site institucional Vertical Fire"
   git remote add origin https://github.com/SEU_USUARIO/vertical-fire.git
   git push -u origin main
   ```
3. Em **Settings → Pages**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
4. O site ficará disponível em `https://SEU_USUARIO.github.io/vertical-fire/`

## Domínio personalizado (opcional)

Se tiver um domínio (ex: `verticalfire.com.br`):
1. Crie um arquivo `CNAME` na raiz com o conteúdo: `verticalfire.com.br`
2. Configure o DNS do seu domínio apontando para GitHub Pages

## Informações para atualizar

| Item | Arquivo | Localização |
|------|---------|-------------|
| Telefone | index.html | Todos os links `wa.me/...` |
| E-mail | index.html | Links `mailto:` e texto |
| Instagram | index.html | Links `instagram.com/...` |
| LinkedIn | index.html | Links `linkedin.com/...` |
| Endereço | index.html | Seção contato |
| Logo | images/logo.png | Substituir arquivo |

## Tecnologias

- HTML5 semântico
- CSS3 custom (sem frameworks)
- JavaScript vanilla
- Google Fonts (Inter)
- Zero dependências externas além de fontes

## Contato Vertical Fire

- WhatsApp: (11) 96888-6837
- E-mail: ecioronaldo.bombeiro@gmail.com
- Instagram: @vertical.fire
