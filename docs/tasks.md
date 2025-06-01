# Roteiro de tarefas

## Configuração de ambiente

- [x] Inicializar o projeto como Next.js
- [x] Configurar ferramentas de desenvolvimento (ESLint, Prettier, TailwindCSS)
  - Para definir _Pettier_ como formatador padrão, no arquivo de configuração do Editor de texto pesquisa por _Default Formatter_ e seleciona _Prettier_. Na mesma barra de pesquisa buscar por Salvar e marca _Format on Save_.
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
  - Para criar um Route Groups, cria-se na pasta /app um diretório envolvido de "()" e dentro dele coloca-se as rotas que fazem parte desse grupo. Por exemplo, /app/(protected)/dashboard e /app/(protected)/clinic-form.

    - **Obs.:** dentro dos parênteses o nome do Route Group é variavel, e um arquivo page.tsx criado dentro dele não será renderizado, por ele não é tratado como uma rota.
    - Como não queremos uma sidebar em rotas diferentes das protegidas, então criamos um arquivo layout.tsx na pasta /app/(protected) e dentro dele renderizamos o componente Sidebar.
    - **Obs.:**
      - Seguir documentação do shadcn/ui para criar o componente sidebar.
      - Atualizar /app/global.css para adicionar o estilo do sidebar.
    - Fazer com que o menu sidebar exiba os dados da clinic e do usuário autenticado(p. ex email).

      - O AppSidebar deve receber os dados da session do usuário autenticado e os dados da clinic.
      - A session já traz as propriedades do usuário autenticado por default.
      - No Better Auth é possivel criar um plugin no /src/lib/auth.ts e customizar uma session com o _import_ de _customSession_ Isso possibilita extender o _schema_ da _session_ para que ele receba além dos dados do _user_ também os dados da _clinic_ já que no schema da aplicação temos a _userToClinicTable_.
      - No arquivo /src/lib/auth-client.ts, registra esse plugin como um generic _<typeof auth>_ e importa-se o _customSessionClient_ do _better-auth/client/plugins_ com isso as propriedades adicionais da session são disponibilizadas no client e podem ser usadas no client component(AppSidebar)
      - tenha botão de logout no footer

- [x] Pagina de médicos
  - Criar componente customizados para todas as paginas da aplicação: PageContainer, PageHeader, PageHeaderContent, PageTitle,PageDescription, PageActions.
- [x] Proteger página de médicos(autenticação)
- [] Criação de médicos

  - Usar component Dialog do shadcn/ui para exibir um formulario.
    - Formulário deve ter os campos validados pelo Zod(formSchema);
    - Formulario deve conter os campo:
    - [x] Nome
    - [x] Especialidade: deve aparecer como um select com opcões de especialidades. Usar componente select do shadcn/ui.
    - [x] Valor da consulta: usar lib react-number-format para tratar input como moeda.
    - [x] Dias de atendimento(semana)
    - [x] Horario de atendimento
  - **Obs. 1:** O Dialog deve ser exibido quando clicar no botao de adicionar medico e também quando clicar no botao de Ver detalhas.
  - **Obs. 1:** Será um mesmo formulário tanto para a criação quanto para a edição de médicos.
  - Já que o formulário será o mesmo cria-se um componente reutilizável. Nos casos da Edição, ele deve receber os dados do médico como _prop_ .
  - [] Salvar as informações no database. - [] Criar _Server Action_(rota de api) que pegará os dados do formulário e enviá-los para o database. - [] Criar um schema para a Server Action isolado. - [] Usar lib [_next-safe-action_](https://next-safe-action.dev/) que lida com as mudanças de tipo entre o form e o database(por exemplo, no form o campo de disponibilida _availableFromWeekDays_ é uma string, já no database é um integer.). - Essa lib se integra bem com o _zod_. - **Obs.:**O schema de um formulário pode ser diferente do que será persistido no database. Por isso é importante criar um schema para a Server Action. - []Fechar o dialog quando salvar o médico - Criar state para controlar o dialog como isOpen e setIsOpen no no add-doctor-button. Se a operacao retornada pelo botão for bem sucedida, então o estado do dialog deve mudar de true para false. No caso foi criada uma _prop_ do tipo interface no _upsert-doctor-form_` chamada _onSuccess()_:
    ```typescript
    interface UpsetDoctorFormProps {
    onSuccess?: () => void;
    }
    const UpsertDoctorForm = ({ onSuccess }: UpsetDoctorFormProps) => {
    ```
  - Posteriormente ela foi passada para o componente que rendiza o formulário _add-doctor-button_:
  - ```typescript
    <UpsertDoctorForm onSuccess={() => setIsOpen(false)} />
    ```

  ```

  ```

- [] Listagem de méd
- [] Listagem de médicos
- [] Atualização de médicos
- [] Exclusão de médicos
