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
    - cria componentes de login e cadastro e os adiciona nas paginas de autenticação.

- [x] Login com e-mail e senha:
  - Utiliza biblioteca [Better Auth](https://www.better-auth.com/). Alternativas: [Auth.js](https://authjs.dev/), [NextAuth.js](https://next-auth.js.org/) ou [Clerk](https://clerk.com/)
  - Consulta [documentação](https://www.better-auth.com/docs/installation) para instalação e configuração.
- [x] Login com Api - Google
  - seguir a documentação do [Better Auth](https://www.better-auth.com/docs/providers/google)
- [x] Fundamentos do Next.js(Rotas, Paginas, Layouts, Actions)
  - Rotas: Quando criamos uma pasta dentro de /app e dentro dela criamos um arquivo page.tsx, ele vai ser uma pagina daquela rota, por exemplo: /app/authentication/page.tsx
  - Paginas: pages.tsx assim como qualquer outro arquivo dentro de /app é são tratados como server component. Isto é, eles rodam do lado do servidor e podem fazer chamadas para APIs. Contudo, estes components não tem habilidade de interagir com o DOM(document object model) e não podem interagir com eventos do browser como onClick, onInput, onChange, etc. Para que interagam, eles precisam ser convertidos em client components, com o uso de "use client". Alternativamente, podem ser criados client componente especificos para cada rota, por exmplo: /app/authentication/components/login.tsx e este podem ser chamados dentro de /app/authentication/page.tsx
  - Actions: São literalmente rotas de API. Elas precisam ser protegidas pelos dados da session do usuários autenticado.
- [x] Criação de clinica

## Gerenciamento de profissionais e disponibilidade

- [] Sidebar e Route Groups
  - Utilizad componenet sidebar do shadcn/ui
  - A sidebar é um element comum a todas as páginas(rotas) da app.
  - Ela pode ser incluída no arquivo /app/layout.tsx e ser usada em todas as páginas da app assim como foi feito com o _Toster_.
  - Para evitar que a sidebar seja renderizada em todas as páginas, por exemplo a pagina de login, utiliza-se o **Route Groups**.
  - Para criar um Route Group, cria-se na pasta /app um diretório envolvido de "()" e dentro dele coloca-se as rotas que fazem parte desse grupo. Por exemplo, /app/(protected)/dashboard e /app/(protected)/clinic-form.
    - **Obs.:** dentro dos parênteses o nome do Route Group é variavel, e um arquivo page.tsx criado dentro dele não será renderizado, por ele não é tratado como uma rota.
- [] Pagina de médicos
- [] Criação de médicos & NextSafeActions
- [] Listagem de médicos
- [] Atualização de médicos
- [] Exclusão de médicos
