### @fybf/client

[![Netlify Status](https://api.netlify.com/api/v1/badges/10d5632c-1a43-4682-bc3d-9a3d90d40096/deploy-status)](https://app.netlify.com/sites/findyourbestfriend/deploys)

Esse é projeto client do Find Your Best Friend. O projeto consiste em um mono-repositório utilizando o [Turborepo](https://turborepo.org/) para gerenciar os pacotes.

### Sobre

A plataforma Find Your Best Friend é um projeto que possui como objetivo ajudar pessoas a encontram seus animais perdidos por meio de avistamentos criados por pessoas da comunidade. Esses avistamentos registram a localização, imagem e informações do animal avistado, possibilitando que seus donos possam encontrá-los.

### Arquitetura

A arquitetura do projeto segue o seguinte diagrama:

![Image](.github/docs/assets/architecture.png)

### Pacotes

O mono-repositório é composto pelos seguintes pacotes:

- [@fybf/web](packages/apps/web): Aplicação principal Next.js
- [@fybf/config.\*](packages/config): Configurações de projeto (eslint, tsconfig, etc...)
- [@fybf/shared.\*](packages/shared): Biblioteca compartilhada entre os pacotes (componentes, tema, etc...)

### Uso

Para rodar o projeto localmente, primeiro deve-se instalar as dependências:

```bash
yarn # ou npm install
```

Após isso, deve-se configurar as váriveis de ambiente em um arquivo chamado `.env` na raiz da aplicação. Para isso, basta copiar o arquivo `.env.example` e preencher as variáveis.

Depois, deve-se rodar o projeto:

```bash
yarn dev # ou npm run dev
```

Outros comandos também estão disponíveis no [package.json](package.json).

### Deploy

O deploy é feito automaticamente pelo [Netlify](https://www.netlify.com/) a partir da branch `develop`. Pull Requests também geram previews automaticamente.
