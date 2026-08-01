# Testes de API com Playwright

[![Playwright](https://img.shields.io/badge/Playwright-API%20Testing-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)](#status-do-projeto)

Projeto de estudos voltado à automação de testes de APIs REST com **Playwright** e **JavaScript**. A suíte exercita a API do **ShortBeyond**, um encurtador de URLs executado em containers com PostgreSQL.

> **Status:** em desenvolvimento. O repositório acompanha minha evolução no curso [Playwright Além da Interface](https://www.udemy.com/course/playwright-alem-da-interface/), de Fernando Papito. Novos cenários e melhorias serão adicionados conforme o avanço no curso.

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Objetivos de aprendizagem](#objetivos-de-aprendizagem)
- [Status do projeto](#status-do-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura do ambiente](#arquitetura-do-ambiente)
- [Pré-requisitos](#pré-requisitos)
- [Como executar](#como-executar)
- [Testes disponíveis](#testes-disponíveis)
- [Relatórios](#relatórios)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Estratégia de testes](#estratégia-de-testes)
- [Roadmap de estudos](#roadmap-de-estudos)
- [Boas práticas adotadas](#boas-práticas-adotadas)
- [Referências](#referências)
- [Autor](#autor)

## Sobre o projeto

Embora seja muito conhecido pela automação de interfaces, o Playwright também oferece o `APIRequestContext`, recurso usado neste projeto para testar o backend diretamente. Dessa forma, as regras de negócio são validadas com feedback rápido e sem dependência de uma interface gráfica.

O ambiente local reúne:

- API REST do ShortBeyond na porta `3333`;
- banco de dados PostgreSQL na porta `5432`;
- Adminer para administração do banco na porta `8080`;
- aplicação web na porta `80`;
- coleção Bruno para explorar as requisições de autenticação;
- suíte automatizada de testes de API com Playwright Test.

## Objetivos de aprendizagem

Ao longo do projeto, pratico:

- configuração e execução de testes de API com Playwright;
- leitura de contratos REST e validação de status, corpo e regras de negócio;
- automação de cadastro, autenticação, autorização e encurtamento de links;
- organização de código com factories, services, hooks e cenários independentes;
- geração de dados dinâmicos com Faker;
- execução de regressão e análise de relatórios HTML;
- preparação do ambiente local com Podman e PostgreSQL;
- evolução futura para fixtures, variáveis de ambiente e testes de performance.

## Status do projeto

**Em desenvolvimento.** No estado atual, a suíte possui **16 cenários automatizados** distribuídos entre disponibilidade da API, cadastro, login e criação de links.

Já estão disponíveis:

- manifesto `shortbeyond.yaml` para iniciar o ambiente com Podman;
- configuração do Playwright direcionada a testes de API;
- health check da API;
- cenários positivos e negativos de cadastro de usuários;
- cenários positivos e negativos de login;
- criação de links autenticada e validações de campos e URL;
- factory com dados dinâmicos de usuário e link;
- services reutilizáveis para autenticação e links;
- relatório HTML após a execução;
- scripts npm para executar a suíte e abrir o relatório.

## Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| [Playwright Test](https://playwright.dev/docs/test-api-testing) | Criação, execução e validação dos testes de API |
| [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | Linguagem dos testes e componentes de suporte |
| [Node.js](https://nodejs.org/) | Ambiente de execução do projeto |
| [Faker](https://fakerjs.dev/) | Geração de dados dinâmicos e independentes |
| [Podman](https://podman.io/) | Execução local dos containers do ShortBeyond |
| [PostgreSQL](https://www.postgresql.org/) | Persistência de dados da aplicação |
| [Adminer](https://www.adminer.org/) | Administração visual do banco de dados |
| [Bruno](https://www.usebruno.com/) | Exploração e documentação de requisições HTTP |
| [Artillery](https://www.artillery.io/) | Testes de performance planejados |

## Arquitetura do ambiente

```text
Testes Playwright / Coleção Bruno
                |
                v
      ShortBeyond API :3333
                |
                v
         PostgreSQL :5432

Adminer :8080 --------> PostgreSQL
Aplicação web :80 ----> ShortBeyond API
```

Os serviços são definidos em `shortbeyond.yaml` e executados no mesmo pod.

| Serviço | Imagem | Porta local |
| --- | --- | --- |
| Banco de dados | `postgres:15` | `5432` |
| Administração do banco | `adminer` | `8080` |
| API ShortBeyond | `beyondtest/shortb-api:beta` | `3333` |
| Aplicação web | `beyondtest/shortb-web:latest` | `80` |

## Pré-requisitos

Antes de começar, instale:

- [Git](https://git-scm.com/);
- [Node.js](https://nodejs.org/) 20 ou superior;
- npm, incluído na instalação do Node.js;
- [Podman](https://podman.io/docs/installation);
- [Bruno](https://www.usebruno.com/downloads), opcional para explorar a coleção de requisições.

Verifique as instalações:

```bash
git --version
node --version
npm --version
podman --version
```

## Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/DouglasAntoni0/testes-de-api-com-playwright.git
cd testes-de-api-com-playwright
```

### 2. Instale as dependências

```bash
npm ci
```

> Se estiver modificando as dependências do projeto, utilize `npm install` para atualizar o `package-lock.json`.

### 3. Inicie o ambiente ShortBeyond

Com o Podman em execução:

```bash
podman play kube shortbeyond.yaml
```

A API deverá responder em `http://localhost:3333/health`. Também estarão disponíveis a aplicação web em `http://localhost`, o Adminer em `http://localhost:8080` e o PostgreSQL em `localhost:5432`.

### 4. Execute os testes

| Objetivo | Comando |
| --- | --- |
| Executar toda a suíte | `npm test` |
| Executar o projeto de API | `npm run test:api` |
| Executar um arquivo específico | `npx playwright test playwright/e2e/health.spec.js` |
| Acompanhar a saída detalhada | `npx playwright test --reporter=list` |

### 5. Encerre o ambiente

Ao finalizar os estudos:

```bash
podman play kube --down shortbeyond.yaml
```

## Testes disponíveis

A configuração usa o projeto `api-tests` e procura os cenários em `playwright/e2e/`.

| Área | Arquivo | Cobertura atual |
| --- | --- | --- |
| Health check | `playwright/e2e/health.spec.js` | API disponível, serviço identificado e status saudável |
| Cadastro | `playwright/e2e/auth/register.spec.js` | Cadastro válido, e-mail duplicado, e-mail inválido e campos obrigatórios |
| Login | `playwright/e2e/auth/login.spec.js` | Login válido, credenciais inválidas e campos obrigatórios |
| Links | `playwright/e2e/links/post.spec.js` | Criação autenticada, URL obrigatória, título obrigatório e validação de URL |

### Health check

O cenário envia uma requisição `GET` para `/health`, espera o status `200` e valida a resposta:

```json
{
  "service": "shortbeyond-api",
  "status": "healthy"
}
```

### Cadastro e login

Os testes de autenticação usam `authService` para encapsular as chamadas HTTP. Dados de usuários válidos são gerados com a factory `getUser()`, evitando dependência entre cenários positivos.

### Encurtamento de links

Cada cenário de links cria um usuário próprio, obtém um token de acesso e utiliza `linksService` para enviar requisições autenticadas para `POST /api/links`. A factory `getUserWithLink()` gera o usuário e os dados do link necessários para o cenário.

## Relatórios

O Playwright está configurado com o reporter HTML. Depois de uma execução, abra o relatório mais recente com:

```bash
npm run test:report
```

Os artefatos gerados (`playwright-report`, `test-results` e `blob-report`) permanecem locais e estão ignorados pelo Git.

Em integração contínua, a configuração também impede `test.only`, tenta novamente os testes que falham, usa um único worker e coleta trace na primeira repetição.

## Estrutura do projeto

```text
.
├── docs/
│   ├── auth/
│   │   ├── Cadastro de ususarios.yml
│   │   ├── Login do usuario.yml
│   │   └── folder.yml
│   └── opencollection.yml
├── playwright/
│   ├── e2e/
│   │   ├── auth/
│   │   │   ├── login.spec.js
│   │   │   └── register.spec.js
│   │   ├── links/
│   │   │   └── post.spec.js
│   │   └── health.spec.js
│   └── support/
│       ├── factories/
│       │   └── user.js
│       └── services/
│           ├── auth.js
│           └── links.js
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
├── README.md
└── shortbeyond.yaml
```

| Caminho | Responsabilidade |
| --- | --- |
| `docs/` | Coleção Bruno usada na exploração da API |
| `playwright/e2e/` | Cenários automatizados de API |
| `playwright/support/factories/` | Geração de dados dinâmicos para os testes |
| `playwright/support/services/` | Encapsulamento de chamadas HTTP por domínio |
| `playwright.config.js` | Configurações de execução, retries, workers e relatórios |
| `shortbeyond.yaml` | Definição dos containers do ambiente local |
| `package.json` | Dependências e comandos npm do projeto |

## Estratégia de testes

A suíte segue os seguintes princípios:

- **independência:** cada cenário prepara os próprios dados;
- **isolamento:** um teste não depende do resultado de outro;
- **clareza:** os nomes descrevem o comportamento esperado;
- **feedback rápido:** as regras são validadas diretamente na camada de API;
- **reutilização:** factories e services concentram responsabilidades repetidas;
- **evidências:** relatórios e traces apoiam a investigação de falhas;
- **evolução contínua:** a cobertura aumenta conforme o projeto de estudos avança.

## Roadmap de estudos

O roadmap será atualizado conforme o avanço no curso.

- [x] Configurar o ambiente local do ShortBeyond
- [x] Criar o projeto Playwright para testes de API
- [x] Validar a disponibilidade da API com um health check
- [x] Iniciar a coleção de requisições para exploração da API
- [x] Automatizar cadastro, login e validação de token
- [x] Criar factories e services reutilizáveis
- [x] Cobrir cenários negativos de autenticação
- [x] Testar o endpoint de encurtamento de links
- [ ] Criar fixtures personalizadas
- [ ] Automatizar consultas com `GET`
- [ ] Automatizar exclusões com `DELETE`
- [ ] Configurar URL base e dados sensíveis por variáveis de ambiente
- [ ] Preparar banco de dados com global setup
- [ ] Explorar formatos adicionais de relatório
- [ ] Adicionar testes de carga, spike tests e análise de resultados com Artillery
- [ ] Configurar integração contínua

## Boas práticas adotadas

- dependências versionadas por meio do `package-lock.json`;
- separação entre cenários, factories, services e documentação exploratória;
- dados dinâmicos para reduzir acoplamento entre testes;
- validações de status HTTP e contrato de resposta;
- artefatos de execução ignorados pelo Git;
- configuração específica para execução em CI;
- histórico incremental para registrar a evolução do aprendizado.

## Referências

- [Curso Playwright Além da Interface — Udemy](https://www.udemy.com/course/playwright-alem-da-interface/)
- [Documentação do Playwright](https://playwright.dev/docs/intro)
- [Testes de API com Playwright](https://playwright.dev/docs/api-testing)
- [Documentação do Podman](https://docs.podman.io/)
- [Documentação do Bruno](https://docs.usebruno.com/)
- [Documentação do Artillery](https://www.artillery.io/docs)

## Autor

Desenvolvido por **Douglas Antonio** como parte dos estudos em qualidade de software e automação de testes.

- GitHub: [@DouglasAntoni0](https://github.com/DouglasAntoni0)

---

Se este projeto for útil como referência, fique à vontade para acompanhar sua evolução. Novos conteúdos serão publicados conforme o avanço no curso.
