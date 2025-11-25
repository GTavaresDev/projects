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
