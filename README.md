# Sistema de Chamada Escolar

Este projeto consiste em um sistema de chamada escolar, composto por um aplicativo móvel, duas APIs (API Alfa e API Beta) e uma interface web. O objetivo é registrar e acompanhar a presença dos alunos de forma eficiente e organizada.

## Contexto do Projeto

### 1. Aplicativo Móvel

O aplicativo terá um formulário onde será possível registrar as seguintes informações de cada aluno:

- **Nome**: Nome do aluno
- **Idade**: Idade do aluno
- **Data da Chamada**: Data em que a chamada foi realizada

Quando o formulário for enviado, os dados serão enviados para a API Alfa.

### 2. API Alfa

A API Alfa receberá os dados do aplicativo e, em seguida, enviará uma mensagem contendo as informações do aluno para um tópico no Kafka. Esta API é responsável por gerenciar a entrada dos dados de chamada e a comunicação com o sistema de mensageria.

### 3. API Beta

A API Beta ficará responsável por ouvir as mensagens do Kafka. Quando uma mensagem é recebida, a API Beta persistirá os dados de presença/falta no banco de dados. Assim, todos os registros de presença dos alunos ficarão armazenados de forma segura e acessível.

### 4. Interface Web

A interface web será composta por duas abas:

- **Lista de assinaturas**: Apresentará uma tabela com todos os envios de dados (nome, idade). Esta tabela consumirá os dados que foram persistidos pela API ALFA.
- **Resumo de Presença**: Fornecerá um resumo de quantas vezes cada pessoa estava presente. Esta tabela consumirá os dados que foram persistidos pela API BETA.

## Tecnologias Utilizadas

- **Frontend**: React.js
- **Backend**: Node.js com NestJS
- **Mensageria**: Apache Kafka
- **Banco de Dados**: PostgreSQL
- **App**: Flutter

## Estrutura do Projeto

O projeto está organizado nas seguintes partes:

1. **App Móvel**: Formulário para registro de alunos.
2. **API Alfa**: Recebe os dados do app, persiste os dados no POSTMAN e envia uma mensagem para o Kafka.
3. **API Beta**: Consome mensagens do Kafka e persiste dados no banco.
4. **Frontend Web**: Exibe dados da lista de pessoas e resumo e presença.

## Como Executar o Projeto

Para rodar o projeto localmente, siga os passos abaixo:
Instruções para Executar o Projeto Localmente
Siga os passos abaixo para configurar e executar o projeto em seu ambiente local:

1. Configuração da API
Navegue até o diretório da API:
cd /api-alfa
Execute o Docker Compose para construir e iniciar os serviços:
sudo docker-compose up --build
Isso fará com que as APIs estejam rodando.

2. Configuração do Aplicativo Web
Navegue até o diretório do aplicativo web:
cd /web-app
Instale as dependências do projeto:
npm install
Inicie o servidor de desenvolvimento:
npm run dev
A aplicação estará disponível em: http://localhost:5173/
3. Configuração do Aplicativo Flutter
É necessário ter o Android Studio instalado.
Para executar o aplicativo Flutter, abra o Android Studio e execute o arquivo main.dart.

## Apresentação
[Video de apresentação](https://youtu.be/ltSKY_JGoxk)
