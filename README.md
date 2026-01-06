## 🍺 Beer Code

Aplicação em Laravel + Livewire para gerenciar um catálogo de cervejas, com listagem paginada, filtros avançados (ABV, IBU, EBC, pH, volume), criação/edição de registros e integração com imagens e lojas (`stores`).  
O projeto está containerizado com **Laravel Sail** usando **PostgreSQL** e front-end com **Vite + TailwindCSS 4**.

---

## 📚 Stack Principal

- **Backend**: Laravel 12, PHP 8.2
- **Autenticação & Segurança**: Laravel Fortify, 2FA
- **Frontend**: Livewire (Flux/Volt), TailwindCSS 4, Vite
- **Banco de Dados**: PostgreSQL (via Docker/Sail)
- **Outros**:
  - Livewire Toaster (notificações)
  - Pest (testes)

---

## ✨ Funcionalidades

- **Autenticação** com login, registro, recuperação de senha e 2FA.
- **Dashboard autenticado**.
- **CRUD de Cervejas**:
  - Listagem paginada (`/beers`)
  - Criação (`/beers/create`)
  - Edição (`/beers/{beer}/edit`)
  - Remoção com feedback visual.
- **Filtros e ordenação** na listagem:
  - Filtro por nome.
  - Filtros numéricos por propriedades: `abv`, `ibu`, `ebc`, `ph`, `volume`.
  - Operadores suportados: `=`, `>`, `<`, `>=`, `<=`.
  - Ordenação asc/desc por coluna.
- **Relacionamentos**:
  - Cerveja ↔ Lojas (`stores`) via pivot `beer_store` (com `price`, `promo_label`, `url`).
  - Cerveja ↔ Imagens (`images`) com cover (`cover`).

---

## 🗂 Estrutura Relevante

- `app/Models/Beer.php`: modelo principal de cerveja e relacionamentos.
- `app/Livewire/Beers/Index.php`: listagem, paginação, filtros e remoção.
- `app/Livewire/Beers/Create.php` e `Update.php`: criação e edição usando `BeerForm`.
- `app/Livewire/Forms/BeerForm.php`: validação e operações de `store`/`update`.
- `app/Services/BeerService.php`: encapsula filtros e ordenação da query de cervejas.
- `routes/web.php`:
  - `/` → `welcome`
  - `/dashboard` (autenticado)
  - `/beers`, `/beers/create`, `/beers/{beer}/edit` (autenticado).
- `docker-compose.yml`: serviços `laravel.test` e `pgsql` prontos para uso com Sail.

---

## 🚀 Como Rodar o Projeto (Visão Geral)

1. Clonar o repositório dentro do WSL (ex.: `/home/seu-usuario/projects/beer-code`).
2. Rodar `composer install` e copiar `.env` (`cp .env.example .env`).
3. Ajustar permissões (`sudo chmod -R 777 storage bootstrap/cache` em dev).
4. Subir containers com `./vendor/bin/sail up -d`.
5. Configurar `.env` para PostgreSQL (se necessário) e rodar `./vendor/bin/sail artisan migrate`.
6. Rodar `./vendor/bin/sail npm install` e `./vendor/bin/sail npm run dev` ou `./vendor/bin/sail npm run build`.

---

# 🚀 Setup Completo: Laravel, Sail e WSL2

Bem-vindo(a) ao guia de configuração do seu ambiente de desenvolvimento! Este documento detalha os passos necessários para ter o projeto **Laravel** rodando perfeitamente dentro do **WSL2** com o auxílio do **Sail**.

## Pré-requisitos (Checklist Rápido)

Certifique-se de que você tem:

* ✅ Windows Subsystem for Linux (WSL2) instalado e configurado.

* ✅ Docker Desktop instalado e rodando (essencial para o Laravel Sail).

## 📍 Passo 1: Transferência do Projeto para o WSL

O primeiro passo é garantir que todos os arquivos do projeto estejam no local correto dentro do seu ambiente Linux.

| **Detalhe** | **Valor** | 
 | ----- | ----- | 
| **CAMINHO NO WINDOWS** | Onde o projeto foi copiado (.localhost) | 
| **CAMINHO NO WSL** | `/home/tsantos/projects/` | 

**Ação:**

1. Copie a pasta raiz do projeto (`.localhost`) para o diretório de projetos do seu usuário no WSL.

2. Confirme se a estrutura final é a esperada: `/home/tsantos/projects/`.

## 📦 Passo 2: Instalação das Dependências PHP (Composer)

Com o projeto no lugar, vamos instalar as dependências de back-end usando o Composer.

No seu terminal Ubuntu (fora do container):

cd ~/projects/ composer install


## 🔑 Passo 3: Ajuste de Permissões do Laravel

O Laravel precisa de permissões de escrita em certas pastas para cache e armazenamento de logs/arquivos. Isso é crucial para evitar erros durante a execução.

Execute o comando de ajuste de permissões de forma recursiva:

sudo chmod -R 777 storage bootstrap/cache


> ⚠️ **Nota de Segurança:** O `777` é o mais permissivo. Em ambientes de produção, use permissões mais restritas. Para desenvolvimento no WSL, é a solução mais prática.

## ⛵ Passo 4: Subindo o Laravel Sail (Docker)

Agora é hora de levantar todos os containers de serviço (PHP, Banco de Dados, etc.) usando o Sail, no modo *detached* (`-d`).

./vendor/bin/sail up -d


### Solução de Problemas (PostgreSQL)

Se você encontrar erros na conexão com o banco de dados (especialmente com PostgreSQL), ajuste o arquivo `.env` do seu projeto para garantir que ele use os nomes de host e credenciais padrão do Sail:








> ```
> DB_CONNECTION=pgsql 
> DB_HOST=pgsql
> DB_PORT=5432
> DB_DATABASE=laravel
> DB_USERNAME=sail
> DB_PASSWORD=secret
>


## 🎨 Passo 5: Configuração do Front-end (Node & NPM)

O front-end exige a instalação de pacotes Node (via NPM) e a compilação de assets (CSS/JS). **Lembre-se:** tudo isso deve ser feito **DENTRO** do container Sail para garantir o ambiente correto.

### 5.1. Limpeza (Fora do Container)

Para evitar conflitos com instalações do WSL nativo, faça uma limpeza das pastas `node_modules` fora do container:

Executado no terminal Ubuntu, na pasta do projeto
sudo rm -rf node_modules sudo rm -f package-lock.json


### 5.2. Instalação e Build (Dentro do Container)

Use o `sail bash` para executar comandos diretamente no container.

Instalar dependências Node/NPM
./vendor/bin/sail npm install

Rodar o build de produção (para compilar os assets)
./vendor/bin/sail npm run build

OU, para desenvolvimento com Live Reload:
./vendor/bin/sail npm run dev

> **Dica de Conferência:** Para ter certeza que o Node está no container, você pode entrar nele e verificar as versões:
>
> ```
> ./vendor/bin/sail bash
> # Dentro do container:
> node -v
> npm -v
> exit # Sair do container
> 
> ```

## ✨ Passo 6: Finalizando a Configuração

Estamos quase lá! Para garantir que o Laravel funcione corretamente e que o banco de dados esteja pronto, execute os comandos finais.

### 6.1. Gerar a Application Key

./vendor/bin/sail artisan key:generate


### 6.2. Rodar as Migrations do Banco de Dados

./vendor/bin/sail artisan migrate


## ✅ FIM: Configuração Concluída!
