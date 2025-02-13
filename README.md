# Consulta de Hash - Electron + Express API

## Descrição

Este é um projeto desenvolvido com Electron e Express que permite a consulta de hashes por meio de uma API. O backend realiza autenticação via OAuth2, obtendo um token de acesso para interagir com a API externa da ONR. O frontend, construído com HTML, CSS e JavaScript, permite a entrada de dados do usuário e exibe os resultados da consulta.

## Funcionalidades

- Interface desktop com Electron.
- Servidor backend com Express para autenticação e consulta de dados.
- Autenticação via client credentials OAuth2.
- Consulta de hashes de documentos.
- Aviso de expiração do token de autenticação.

## Tecnologias Utilizadas

- **Electron**: Interface desktop.
- **Node.js & Express**: Backend e API.
- **Fetch API**: Requisições HTTP.
- **MongoDB (se aplicável)**: Armazenamento de dados.
- **HTML, CSS e JavaScript**: Interface do usuário.

## Estrutura do Projeto

```
projeto/
│── public/
│   ├── index.html  # Interface principal
│   ├── css/
│   │   ├── styles.css  # Estilos do frontend
│   ├── js/
│       ├── main.js  # Lógica do frontend
│
│── src/
│   ├── server.js  # Servidor Express
│   ├── routes/
│   │   ├── routes.js  # Definição de rotas
│   ├── controllers/
│   │   ├── controllers.js  # Lógica de requisição HTTP
│
│── app.js  # Configuração inicial do Electron
│── package.json  # Dependências e scripts
│── .env  # Variáveis de ambiente (CLIENT_ID, CLIENT_SECRET)
```

## Instalação e Execução

Clone o repositório:

```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

Instale as dependências:

```sh
npm install
```

Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto e adicione:

```
CLIENT_ID=seu_client_id
CLIENT_SECRET=seu_client_secret
```

Inicie o aplicativo Electron:

```sh
npm start
```

## Como Usar

1. Abra o aplicativo e clique em **Login** para obter um token de autenticação.
2. Insira os dados necessários na interface.
3. Clique em **Search** para consultar os hashes.
4. Caso o token expire, uma mensagem de alerta será exibida para realizar novo login.

## Capturas de Tela

(Adicione imagens da interface se desejar)

## Contribuição

1. Fork este repositório.
2. Crie um branch com sua funcionalidade:

   ```sh
   git checkout -b minha-funcionalidade
   ```

3. Commit suas modificações:

   ```sh
   git commit -m 'Adiciona nova funcionalidade'
   ```

4. Envie para o branch principal:

   ```sh
   git push origin minha-funcionalidade
   ```

5. Abra um **Pull Request**.

## Licença

Este projeto está sob a licença **MIT**. Para mais detalhes, consulte o arquivo `LICENSE`.
