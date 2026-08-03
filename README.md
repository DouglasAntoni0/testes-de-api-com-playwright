# Testes de API com Playwright

[![Playwright](https://img.shields.io/badge/Playwright-API%20Testing-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Testes](https://img.shields.io/badge/testes-20%20cenários%20automatizados-2EAD33)](#testes-disponíveis)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)](#status-do-projeto)

Projeto de automação de testes de APIs REST desenvolvido com **Playwright** e **JavaScript** sobre a aplicação **ShortBeyond**, um encurtador de URLs com API em Go, PostgreSQL e serviços executados em containers.

Mais do que reproduzir exemplos de um curso, este repositório registra a construção progressiva de uma arquitetura de testes organizada, reutilizável e orientada a riscos. O projeto demonstra, na prática, minha capacidade de transformar regras de negócio em cenários automatizados claros, independentes e fáceis de manter, cobrindo desde a criação até a consulta e a exclusão de recursos.

> **Status:** em desenvolvimento. O conteúdo acompanha minha evolução no curso [Playwright Além da Interface](https://www.udemy.com/course/playwright-alem-da-interface/), de Fernando Papito, e recebe novas implementações conforme avanço nos estudos.

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Diferenciais demonstrados](#diferenciais-demonstrados)
- [Objetivos de aprendizagem](#objetivos-de-aprendizagem)
- [Status do projeto](#status-do-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura do ambiente](#arquitetura-do-ambiente)
- [Pré-requisitos](#pré-requisitos)
- [Como executar](#como-executar)
- [Testes disponíveis](#testes-disponíveis)
- [Arquitetura dos testes](#arquitetura-dos-testes)
- [Relatórios e evidências](#relatórios-e-evidências)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Estratégia de testes](#estratégia-de-testes)
- [Roadmap de estudos](#roadmap-de-estudos)
- [Boas práticas adotadas](#boas-práticas-adotadas)
- [Referências](#referências)
- [Autor](#autor)

## Sobre o projeto

O Playwright é bastante conhecido pela automação de interfaces, mas também oferece o `APIRequestContext`, utilizado neste projeto para testar o backend diretamente. Essa abordagem antecipa a validação das regras de negócio, reduz o tempo de feedback e facilita o diagnóstico de falhas sem depender da interface gráfica.

O ambiente local reúne:

- API REST do ShortBeyond na porta `3333`;
- banco de dados PostgreSQL na porta `5432`;
- Adminer para administração do banco na porta `8080`;
- aplicação web na porta `80`;
- coleção Bruno para exploração das requisições de autenticação;
- suíte automatizada de testes de API com execução paralela;
- relatórios HTML e traces para investigação de falhas.

## Diferenciais demonstrados

Este projeto evidencia competências importantes para atuação em qualidade de software e automação:

- **visão de risco:** cobertura de caminhos felizes, validações obrigatórias, dados inválidos, duplicidade e credenciais incorretas;
- **cobertura de ciclo de vida:** automação de criação, consulta e exclusão de links, incluindo recursos existentes, coleções vazias e identificadores inexistentes;
- **arquitetura sustentável:** separação entre specs, fixtures, factories e services, reduzindo repetição e acoplamento;
- **independência dos testes:** geração dinâmica de usuários, links e coleções de diferentes tamanhos para evitar dependência de massa fixa;
- **reuso com fixtures personalizadas:** injeção de `authService` e `linksService` diretamente nos cenários;
- **validação de contrato:** assertions sobre status HTTP, mensagens, identificadores, dados retornados e ausência de campos sensíveis;
- **ambiente reproduzível:** API, banco, Adminer e aplicação web documentados em um manifesto Podman;
- **preocupação com manutenção:** nomes orientados ao comportamento, estrutura por domínio, comandos npm e documentação evolutiva;
- **preparo para escala:** execução paralela local e configuração específica para retries, workers e traces em CI.

O resultado é um repositório que serve tanto como registro de aprendizagem quanto como demonstração prática de organização, raciocínio de testes e evolução técnica.

## Objetivos de aprendizagem

Ao longo do projeto, pratico e aprofundo:

- configuração e execução de testes de API com Playwright;
- leitura de contratos REST e identificação de regras relevantes;
- validação de status code, corpo da resposta e regras de negócio;
- automação de cadastro, autenticação, autorização e encurtamento de links;
- criação de fixtures personalizadas para injeção de dependências;
- reutilização de código com factories e services;
- geração de dados dinâmicos com Faker;
- independência e isolamento entre cenários;
- execução de regressão e análise de relatórios;
- preparação de ambiente local com Podman e PostgreSQL;
- evolução futura para consultas, exclusões e testes de performance.

## Status do projeto

**Em desenvolvimento.** No estado atual, a suíte possui **20 cenários automatizados em seis arquivos de teste**, cobrindo disponibilidade da API, cadastro, login e o ciclo de criação, consulta e exclusão de links.

Já foram implementados:

- manifesto `shortbeyond.yaml` para iniciar o ambiente com Podman;
- projeto Playwright configurado exclusivamente para testes de API;
- health check com validação do serviço e do estado da aplicação;
- cenários positivos e negativos de cadastro e login;
- criação, consulta e exclusão autenticada de links, com validações de campos, URL e identificadores;
- factories para usuários, links individuais e coleções de links com dados dinâmicos;
- services reutilizáveis para autenticação, criação, consulta e exclusão de links;
- utilitário próprio para geração de ULIDs válidos em cenários negativos;
- fixtures personalizadas para disponibilizar os services nos testes;
- execução paralela e comportamento específico para CI;
- relatório HTML e trace na primeira repetição;
- scripts npm para execução e consulta de relatórios.

## Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| [Playwright Test](https://playwright.dev/docs/test-api-testing) | Execução, organização, fixtures, assertions e relatórios dos testes de API |
| [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | Linguagem dos cenários e componentes de suporte |
| [Node.js](https://nodejs.org/) | Ambiente de execução do projeto |
| [Faker](https://fakerjs.dev/) | Geração de usuários e links dinâmicos |
| [Podman](https://podman.io/) | Execução local dos containers do ShortBeyond |
| [PostgreSQL](https://www.postgresql.org/) | Persistência de dados da aplicação |
| [Adminer](https://www.adminer.org/) | Administração visual do banco de dados |
| [Bruno](https://www.usebruno.com/) | Exploração e documentação de requisições HTTP |
| [Artillery](https://www.artillery.io/) | Testes de performance planejados no roadmap |

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
| API ShortBeyond | `beyondtest/shortb-api:hotfix` | `3333` |
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

Para uma instalação reproduzível a partir do lockfile:

```bash
npm ci
```

Se estiver modificando as dependências, utilize `npm install` para atualizar o `package-lock.json`.

### 3. Inicie o ambiente ShortBeyond

Com o Podman em execução:

```bash
podman play kube shortbeyond.yaml
```

Depois que os containers estiverem prontos, a API deverá responder em `http://localhost:3333/health`.

Também estarão disponíveis:

- aplicação web: `http://localhost`;
- Adminer: `http://localhost:8080`;
- PostgreSQL: `localhost:5432`.

### 4. Execute os testes

| Objetivo | Comando |
| --- | --- |
| Executar toda a suíte | `npm test` |
| Executar o projeto de API | `npm run test:api` |
| Executar um arquivo específico | `npx playwright test playwright/e2e/links/health.spec.js` |
| Acompanhar a saída detalhada | `npx playwright test --reporter=list` |

O projeto utiliza o Playwright somente para testes de API. Não é necessário instalar ou abrir um navegador para executar os cenários.

### 5. Encerre o ambiente

Ao finalizar os estudos:

```bash
podman play kube --down shortbeyond.yaml
```

## Testes disponíveis

A configuração utiliza o projeto `api-tests` e procura os cenários em `playwright/e2e/`.

| Área | Quantidade | Arquivo | Cobertura atual |
| --- | ---: | --- | --- |
| Health check | 1 | `playwright/e2e/links/health.spec.js` | Disponibilidade, identificação do serviço e estado saudável |
| Cadastro | 6 | `playwright/e2e/auth/register.spec.js` | Cadastro válido, duplicidade, formato de e-mail e campos obrigatórios |
| Login | 5 | `playwright/e2e/auth/login.spec.js` | Login válido, senha incorreta, usuário inexistente e campos obrigatórios |
| Criação de links | 4 | `playwright/e2e/links/post.spec.js` | Criação autenticada, campos obrigatórios e validação de URL |
| Consulta de links | 2 | `playwright/e2e/links/get.spec.js` | Lista com cinco links e lista vazia |
| Exclusão de links | 2 | `playwright/e2e/links/delete.spec.js` | Exclusão válida e tentativa com ULID inexistente |
| **Total** | **20** | **6 arquivos** | **Cobertura positiva e negativa da API** |

### Health check

O cenário envia uma requisição `GET` para `/health`, espera o status `200` e valida a resposta:

```json
{
  "service": "shortbeyond-api",
  "status": "healthy"
}
```

### Cadastro de usuários

A suíte cobre cadastro bem-sucedido, tentativa com e-mail duplicado, formato inválido e ausência de nome, e-mail ou senha. No fluxo positivo, também confirma que a API não devolve a senha no corpo da resposta.

### Login de usuários

Os cenários validam login bem-sucedido, geração de token, dados do usuário autenticado, senha incorreta, e-mail não cadastrado e campos obrigatórios. A senha também é verificada como ausente na resposta de sucesso.

### Ciclo de vida de links

Os cenários criam usuários próprios, obtêm tokens e exercitam o domínio de links por meio de requisições autenticadas. A cobertura valida criação bem-sucedida, código curto alfanumérico, campos obrigatórios, URL inválida, listagem de múltiplos registros, coleção vazia, exclusão válida e tentativa de remoção com ULID inexistente.

## Arquitetura dos testes

A organização adotada reduz responsabilidades dentro das specs:

```text
Spec de teste
    |
    +--> Fixture personalizada
    |        |
    |        +--> authService
    |        +--> linksService
    |
    +--> Factory de dados
             |
             +--> Usuário dinâmico
             +--> Link ou coleção dinâmica
```

### Fixtures

O arquivo `playwright/support/fixtures/index.js` estende o `test` padrão do Playwright e injeta:

- `auth`: operações de cadastro, login e obtenção de token;
- `links`: criação, consulta e exclusão autenticada de links.

Com isso, os cenários recebem as dependências de que precisam diretamente nos argumentos do teste, reduzindo inicializações repetidas e deixando a intenção de cada caso mais visível.

### Factories

A factory `user.js` disponibiliza:

- `getUser()`: cria usuários únicos com nome e e-mail dinâmicos;
- `getUserWithLink()`: cria o usuário acompanhado de URL e título para um link;
- `getUserWithLinks()`: cria o usuário com uma coleção dinâmica de links no tamanho solicitado.

### Services

Os services encapsulam detalhes HTTP:

- `authService`: cadastro, login e extração do token;
- `linksService`: criação, consulta, obtenção de ID e exclusão de links com autenticação Bearer.

Essa divisão permite evoluir endpoints ou payloads com menor impacto sobre os cenários de negócio.

### Utilitários

O arquivo `playwright/support/utils.js` gera ULIDs no formato esperado pela API. Isso permite testar identificadores inexistentes de forma realista, sem depender de valores fixos ou inválidos para o contrato.

## Relatórios e evidências

O Playwright está configurado com o reporter HTML. Depois de uma execução, abra o relatório mais recente com:

```bash
npm run test:report
```

Os artefatos gerados (`playwright-report`, `test-results` e `blob-report`) permanecem locais e estão ignorados pelo Git.

Quando a variável `CI` está ativa, a configuração:

- impede o uso acidental de `test.only`;
- repete testes que falham até duas vezes;
- utiliza um único worker para tornar a execução previsível;
- coleta trace na primeira repetição.

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
│   │   └── links/
│   │       ├── delete.spec.js
│   │       ├── get.spec.js
│   │       ├── health.spec.js
│   │       └── post.spec.js
│   └── support/
│       ├── factories/
│       │   └── user.js
│       ├── fixtures/
│       │   └── index.js
│       ├── services/
│       │   ├── auth.js
│       │   └── links.js
│       └── utils.js
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
├── README.md
└── shortbeyond.yaml
```

| Caminho | Responsabilidade |
| --- | --- |
| `docs/` | Coleção Bruno usada para exploração manual da API |
| `playwright/e2e/` | Cenários automatizados organizados por domínio |
| `playwright/support/factories/` | Geração de dados dinâmicos |
| `playwright/support/fixtures/` | Injeção dos services nos cenários |
| `playwright/support/services/` | Encapsulamento das chamadas HTTP |
| `playwright/support/utils.js` | Geração de ULIDs para cenários controlados |
| `playwright.config.js` | Projetos, paralelismo, retries, workers e relatórios |
| `shortbeyond.yaml` | Definição dos containers do ambiente local |
| `package.json` | Dependências e comandos npm |

## Estratégia de testes

A suíte segue os seguintes princípios:

- **independência:** cada cenário prepara os próprios dados;
- **isolamento:** um teste não depende da ordem ou do resultado de outro;
- **clareza:** os nomes descrevem o comportamento esperado;
- **feedback rápido:** regras são validadas diretamente na camada de API;
- **cobertura baseada em risco:** caminhos positivos, negativos e validações de contrato recebem atenção explícita;
- **reutilização:** fixtures, factories e services concentram responsabilidades recorrentes;
- **evidências:** relatórios e traces apoiam a investigação de falhas;
- **evolução contínua:** a arquitetura cresce junto com o aprendizado, sem perder organização.

## Roadmap de estudos

O roadmap será atualizado conforme o avanço no curso.

- [x] Configurar o ambiente local do ShortBeyond
- [x] Criar o projeto Playwright para testes de API
- [x] Validar a disponibilidade da API com um health check
- [x] Iniciar a coleção de requisições para exploração da API
- [x] Automatizar cadastro, login e validação de token
- [x] Criar factories e services reutilizáveis
- [x] Criar fixtures personalizadas
- [x] Cobrir cenários negativos de autenticação
- [x] Testar o endpoint de encurtamento de links
- [x] Executar a regressão completa pela CLI
- [x] Automatizar consultas com `GET`
- [x] Automatizar exclusões com `DELETE`
- [ ] Configurar URL base e dados sensíveis por variáveis de ambiente
- [ ] Preparar o banco de dados com global setup
- [ ] Explorar formatos adicionais de relatório
- [ ] Adicionar testes de carga, spike tests e análise de resultados com Artillery
- [ ] Configurar integração contínua

## Boas práticas adotadas

- dependências versionadas por meio do `package-lock.json`;
- separação clara entre cenários, fixtures, factories, services e documentação;
- dados dinâmicos para reduzir colisões e acoplamento entre testes;
- geração parametrizável de coleções para validar respostas com diferentes volumes;
- geração de ULID para cenários negativos aderentes ao contrato;
- services reutilizados inclusive nas precondições dos cenários;
- validações de status HTTP, mensagens e contratos de resposta;
- verificação de ausência de senha em respostas de sucesso;
- autenticação Bearer encapsulada no service de links;
- cobertura do fluxo de criação, listagem e exclusão de recursos;
- execução paralela para feedback local mais rápido;
- artefatos de execução ignorados pelo Git;
- configuração preparada para comportamento controlado em CI;
- documentação detalhada e alinhada ao estado real do código.

## Referências

- [Curso Playwright Além da Interface — Udemy](https://www.udemy.com/course/playwright-alem-da-interface/)
- [Documentação do Playwright](https://playwright.dev/docs/intro)
- [Testes de API com Playwright](https://playwright.dev/docs/api-testing)
- [Documentação do Podman](https://docs.podman.io/)
- [Documentação do Bruno](https://docs.usebruno.com/)
- [Documentação do Artillery](https://www.artillery.io/docs)

## Autor

Desenvolvido por **Douglas Antonio**, com foco em qualidade de software, automação de testes e construção de soluções confiáveis.

Este projeto traduz estudos em prática: cada etapa adicionada ao repositório demonstra evolução na leitura de requisitos, no desenho de cenários, na organização da automação e na busca por feedback rápido. Meu objetivo é construir testes que não apenas passem, mas que sejam claros, úteis para investigação e sustentáveis conforme o produto evolui. A expansão para criação, consulta e exclusão demonstra uma evolução consciente da cobertura e da arquitetura, não apenas um aumento na quantidade de casos.

- GitHub: [@DouglasAntoni0](https://github.com/DouglasAntoni0)

---

Se este projeto for útil como referência, fique à vontade para acompanhar sua evolução, explorar os cenários e acompanhar os próximos incrementos.
