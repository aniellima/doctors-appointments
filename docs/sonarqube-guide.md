# Configuração do SonarQube

## Instalação e Configuração

- [x] Configurar SonarQube via Docker Compose
  - Criar arquivo `docker-compose.yml` com configurações para SonarQube e PostgreSQL
  - Configurar volumes para persistência de dados entre reinicializações
  - Expor SonarQube na porta 9000 e PostgreSQL na porta 5433
  - Adicionar healthchecks para garantir inicialização adequada dos serviços

- [x] Conectar ao banco de dados PostgreSQL dedicado
  - Criar container PostgreSQL separado do banco de dados da aplicação
  - Configurar usuário, senha e banco de dados para SonarQube
  - Persistir dados em volumes Docker para manter análises entre reinicializações

- [x] Configurar projeto no SonarQube
  - Criar arquivo `sonar-project.properties` com configurações do projeto
  - Definir chave do projeto, nome, versão e diretórios a serem analisados
  - Configurar exclusões de arquivos e diretórios irrelevantes

## Integração com Workflow de Desenvolvimento

- [x] Configurar autenticação segura
  - Gerar token de autenticação no SonarQube
  - Armazenar token no arquivo `.env` (ignorado pelo Git)
  - Configurar ambiente para usar o token sem expor credenciais

- [x] Automatizar análise de código
  - Instalar husky para gerenciar hooks do Git
  - Configurar pre-commit hook para executar análise antes de cada commit
  - Excluir diretório `.scannerwork` do controle de versão (gitignore)

- [x] Configurar IDE para feedback em tempo real
  - Instalar extensão SonarLint no editor
  - Conectar SonarLint ao servidor SonarQube local
  - Vincular projeto para sincronizar regras entre local e servidor

## Conceitos Aprendidos

- Docker Compose para orquestração de múltiplos containers
- Persistência de dados com volumes Docker
- Separação de ambientes de banco de dados (aplicação vs. análise)
- Integração de ferramentas de qualidade de código no fluxo de trabalho Git
- Configuração de gates de qualidade para manter padrões de código
