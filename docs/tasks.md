# Roteiro de tarefas

## Configuração de ambiente

- [x] Inicializar o projeto como Next.js
- [x] Configurar ferramentas de desenvolvimento (ESLint, Prettier, TailwindCSS)
- [x] Desenho do modelo de dados
- [x] Configurar Drizzle e o banco de dados PostgreSQL
- [x] Configurar o shadcn/ui
- [x] Commits e push iniciais

## Autenticacao e Configuracao do Estabelecimento

- [x] Tela de login e criação de conta:

  - Cria uma pagina de autenticação.

    - Obs.: No Nextjs, quando criamos um pasta dentro de /app e dentro dela criamos um arquivo page.tsx, ele vai ser uma pagina daquela rota.
    - Exemplo: /app/authentication/page.tsx

  - Importa componentes de autenticação do shadcn/ui

    - Instala o componente Tabs do shadcn/ui

    ```bash
    pnpm dlx shadcn@latest add tabs
    ```

    - Verifica e instala as dependencias do componente e as instalas com comando similar.
    - Cola o codigo do componente na /app/authentication/page.tsx e realiza as importações(CRTL+.) e modificações necessarias.
    - Adiciona component 'Form' quem em conjunto com o [Zod](https://zod.dev/) proporcciona a criação de um formulario com validações.

- [] Login com e-mail e senha
- [] Login com Api - Google
- [] Fundamentos do Next.js(Rotas, Paginas, Layouts)
- [] Criação de clinica
