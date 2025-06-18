# Desafio API QA

Este projeto contém testes automatizados utilizando Cypress.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- npm (geralmente vem com Node.js)

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-seu-repositorio]
cd desafio-api-QA
```

2. Instale as dependências:
```bash
npm install
```

## Executando os Testes

Existem duas maneiras de executar o Cypress:

### Modo Interativo (Interface Gráfica)

Para abrir o Cypress em modo interativo, execute:
```bash
npm run cypress:open
```

Isso abrirá a interface gráfica do Cypress onde você pode:
- Selecionar o tipo de teste (E2E ou Component)
- Visualizar e executar testes específicos
- Ver os resultados em tempo real

### Modo Headless (Linha de Comando)

Para executar os testes via linha de comando:
```bash
npm run cypress:run
```

## Estrutura do Projeto

```
cypress/
├── e2e/          # Testes end-to-end
├── fixtures/     # Arquivos de dados para testes
├── support/      # Comandos customizados e configurações
└── downloads/    # Arquivos baixados durante os testes
```

## Scripts Disponíveis

- `npm run cypress:open` - Abre a interface gráfica do Cypress
- `npm run cypress:run` - Executa os testes em modo headless

## Relatórios

Os resultados dos testes podem ser encontrados em:
- Screenshots: `cypress/screenshots/` (em caso de falhas)
- Vídeos: `cypress/videos/` (quando habilitado)