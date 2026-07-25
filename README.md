# Testes de API com Playwright

[![Playwright](https://img.shields.io/badge/Playwright-API%20Testing-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue)](#status-do-projeto)

Projeto de estudos dedicado à automação de testes de APIs REST com **Playwright** e **JavaScript**.

O repositório acompanha minha evolução no curso [Playwright Além da Interface](https://www.udemy.com/course/playwright-alem-da-interface/), ministrado por Fernando Papito na Udemy. A aplicação usada nos exercícios é o **ShortBeyond**, um sistema de encurtamento de URLs com API em Go, banco PostgreSQL e serviços executados em containers.

> Este é um projeto em evolução. Novos testes, factories, fixtures, hooks, relatórios e cenários de performance serão adicionados à medida que eu avançar no curso.

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

O Playwright é bastante conhecido pela automação de interfaces web, mas também oferece uma API poderosa para testar serviços HTTP. Neste projeto, o foco está no uso do `APIRequestContext` para enviar requisições diretamente ao backend e validar o comportamento da API sem depender de uma interface gráfica.

O ambiente do ShortBeyond reúne:

- uma API REST executada na porta `3333`;
- um banco de dados PostgreSQL na porta `5432`;
- o Adminer para administração do banco na porta `8080`;
- uma aplicação web disponibilizada na porta `80`;
- uma coleção de requisições para exploração e documentação da API;
- testes automatizados escritos com Playwright Test.

Essa abordagem permite aplicar **Shift-Left Testing**: as regras de negócio são verificadas ainda na camada de serviço, com feedback rápido e sem a necessidade de aguardar a interface da aplicação.

## Objetivos de aprendizagem

Ao longo do desenvolvimento deste repositório, pretendo praticar:

- configuração de um projeto de testes de API com Playwright;
- preparação de um ambiente local reproduzível com containers;
- leitura e exploração de contratos de API;
- criação de requisições HTTP para endpoints REST;
- validação de status code, headers e corpo da resposta;
- automação do ciclo CRUD;
- testes de cadastro, autenticação e autorização;
- geração e validação de tokens;
- independência e isolamento entre cenários;
- reutilização de código com factories, hooks e fixtures;
- gerenciamento de configurações por variáveis de ambiente;
- execução de regressão pela linha de comando;
- geração e análise de relatórios;
- testes de carga e performance com Artillery.

## Status do projeto

**Em desenvolvimento.**

O conteúdo atual representa o início da jornada no curso. Até o momento, o projeto contém:

- manifesto do ambiente ShortBeyond para execução com Podman;
- configuração inicial do Playwright;
- projeto de testes dedicado à API;
- teste automatizado de disponibilidade da API (health check);
- teste automatizado de cadastro de usuários com dados dinâmicos;
- geração de dados fake com `@faker-js/faker`;
- coleção inicial de requisições para os fluxos de autenticação;
- geração de relatório HTML após a execução.

Os próximos commits acompanharão o avanço nas aulas. Por isso, a quantidade de cenários, a organização das pastas e alguns comandos podem evoluir durante o aprendizado.

## Tecnologias

| Tecnologia | Utilização |
| --- | --- |
| [Playwright Test](https://playwright.dev/docs/test-api-testing) | Criação, execução e validação dos testes de API |
| [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | Linguagem utilizada nos testes |
| [Node.js](https://nodejs.org/) | Ambiente de execução do projeto |
| [Faker](https://fakerjs.dev/) | Geração de dados dinâmicos para os testes |
| [Podman](https://podman.io/) | Execução local dos containers do ShortBeyond |
| [PostgreSQL](https://www.postgresql.org/) | Banco de dados da aplicação |
| [Adminer](https://www.adminer.org/) | Administração visual do banco de dados |
| [Bruno](https://www.usebruno.com/) | Exploração e organização das requisições da API |
| [Artillery](https://www.artillery.io/) | Testes de performance previstos no roadmap |

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
Aplicação Web :80 ----> ShortBeyond API
```

Os serviços são definidos no arquivo `shortbeyond.yaml` e executados no mesmo pod:

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
- [Bruno](https://www.usebruno.com/downloads), opcional para explorar a coleção.

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
npm install
```

O projeto utiliza o Playwright somente para testes de API. Por isso, não é necessário abrir um navegador para executar o cenário atual.

### 3. Inicie o ambiente ShortBeyond

Com o Podman em execução:

```bash
podman play kube shortbeyond.yaml
```

Depois que os containers estiverem prontos, a API deverá responder em:

```text
http://localhost:3333/health
```

Também estarão disponíveis:

- aplicação web: `http://localhost`;
- Adminer: `http://localhost:8080`;
- PostgreSQL: `localhost:5432`.

### 4. Execute os testes

Para executar toda a suíte:

```bash
npx playwright test
```

Para executar somente o projeto de API:

```bash
npx playwright test --project=api-tests
```

Para executar um arquivo específico:

```bash
npx playwright test playwright/e2e/health.spec.js
```

Para acompanhar uma execução mais detalhada:

```bash
npx playwright test --reporter=list
```

### 5. Encerre o ambiente

Ao finalizar os estudos:

```bash
podman play kube --down shortbeyond.yaml
```

## Testes disponíveis

### Health check

Arquivo: `playwright/e2e/health.spec.js`

O cenário verifica se a API está disponível e saudável:

1. envia uma requisição `GET` para `/health`;
2. valida o status HTTP `200`;
3. confirma que o serviço retornado é `shortbeyond-api`;
4. confirma que o estado retornado é `healthy`.

Resposta esperada:

```json
{
  "service": "shortbeyond-api",
  "status": "healthy"
}
```

### Cadastro de usuários

Arquivo: `playwright/e2e/auth/register.spec.js`

O cenário valida o cadastro de um novo usuário na API:

1. gera dados dinâmicos (nome e e-mail) com `@faker-js/faker`;
2. envia uma requisição `POST` para `/api/auth/register`;
3. valida o status HTTP `201`;
4. confirma a mensagem de sucesso;
5. confirma que o usuário retornado possui `id`, `name` e `email`;
6. garante que a senha **não** é retornada na resposta.

Requisição enviada:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "pwd123"
}
```

## Relatórios

O Playwright está configurado para gerar um relatório HTML. Depois da execução, abra o último relatório com:

```bash
npx playwright show-report
```

Os relatórios, traces e resultados são artefatos locais e não são enviados ao GitHub. Eles estão listados no `.gitignore`.

Em ambientes de integração contínua, a configuração atual também:

- impede o uso acidental de `test.only`;
- repete testes que falharem até duas vezes;
- utiliza um único worker para tornar a execução mais previsível;
- coleta trace na primeira repetição de um teste.

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
│   └── e2e/
│       ├── auth/
│       │   └── register.spec.js
│       └── health.spec.js
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
├── README.md
└── shortbeyond.yaml
```

| Caminho | Responsabilidade |
| --- | --- |
| `docs/` | Coleção de requisições usada na exploração da API |
| `playwright/e2e/` | Cenários automatizados de API |
| `playwright.config.js` | Configurações de execução, projetos, retries, workers e relatórios |
| `shortbeyond.yaml` | Definição dos containers do ambiente local |
| `package.json` | Dependências e metadados do projeto Node.js |

## Estratégia de testes

À medida que a suíte crescer, os cenários serão organizados em torno de alguns princípios:

- **independência:** um teste não deve depender da execução ou do resultado de outro;
- **isolamento:** cada cenário deve preparar os próprios dados e limpar o que não for mais necessário;
- **clareza:** nomes de testes devem descrever o comportamento esperado;
- **feedback rápido:** validações na camada de API reduzem o tempo de diagnóstico;
- **cobertura relevante:** serão considerados fluxos positivos, negativos e regras de negócio;
- **reutilização:** código repetido deverá ser extraído para factories, fixtures ou helpers;
- **configuração externa:** URLs e dados sensíveis deverão ser fornecidos por variáveis de ambiente;
- **evidências:** relatórios e traces deverão facilitar a investigação de falhas.

## Roadmap de estudos

O roadmap abaixo é vivo e será atualizado conforme o progresso no curso.

- [x] Configurar o ambiente local do ShortBeyond
- [x] Criar o projeto Playwright para testes de API
- [x] Validar a disponibilidade da API com um health check
- [x] Iniciar a coleção de requisições para exploração da API
- [x] Automatizar o cadastro de usuários
- [ ] Garantir a independência dos cenários
- [ ] Criar factories para geração de dados
- [ ] Aplicar hooks de preparação e limpeza
- [ ] Automatizar o login e validar o token
- [ ] Testar o endpoint de encurtamento de links
- [ ] Extrair código reutilizável
- [ ] Criar fixtures personalizadas
- [ ] Automatizar consultas com `GET`
- [ ] Automatizar exclusões com `DELETE`
- [ ] Executar a regressão completa pela CLI
- [ ] Configurar a URL base com variáveis de ambiente
- [ ] Explorar diferentes formatos de relatório
- [ ] Preparar o banco com global setup
- [ ] Adicionar testes de carga com Artillery
- [ ] Adicionar spike tests e analisar os resultados
- [ ] Configurar integração contínua

## Boas práticas adotadas

- dependências fixadas por meio do `package-lock.json`;
- separação entre código de teste e documentação exploratória;
- exclusão de dependências e artefatos gerados do controle de versão;
- configuração específica para execução em CI;
- uso de assertions para validar o contrato da resposta;
- nomes de cenários escritos em português e orientados ao comportamento;
- histórico incremental para registrar a evolução do aprendizado.

## Referências

- [Curso Playwright Além da Interface — Udemy](https://www.udemy.com/course/playwright-alem-da-interface/)
- [Documentação do Playwright](https://playwright.dev/docs/intro)
- [Testes de API com Playwright](https://playwright.dev/docs/api-testing)
- [Documentação do Podman](https://docs.podman.io/)
- [Documentação do Bruno](https://docs.usebruno.com/)
- [Documentação do Artillery](https://www.artillery.io/docs)

## Autor

Desenvolvido por **Douglas Antonio** como parte dos seus estudos em qualidade de software e automação de testes.

- GitHub: [@DouglasAntoni0](https://github.com/DouglasAntoni0)

---

Se este projeto for útil como referência, fique à vontade para acompanhar sua evolução. Novos conteúdos serão publicados conforme o avanço no curso.
