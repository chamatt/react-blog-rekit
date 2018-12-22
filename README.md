# react-blog-rekit

Depois de criar um blog para fazer um tutorial com javascript puro ([no Medium](https://medium.com/@matt.vicent/como-fazer-um-blog-simples-com-javascript-e-requisi%C3%A7%C3%A3o-ajax-4f164921ae20)), eu resolvi transformar ele para React e adicionar novas funcionalidade, como rotas, edição de posts, suporte a Markdown, etc.

Para rodar na sua máquina em modo de desenvolvimento, basta executar os seguintes comandos:
```
npm install
npm run dev
```
e ir para http://localhost:6075

Para executar em modo de produção, basta executar os seguintes comandos:
```
npm install
npm build
npm start
```
O repositório já possui um Procfile, e está todo configura tanto pra ser rodado localmente (localhost:3000), quanto pra ser enviado pro Heroku (ou Dokku).

Esse projeto foi feito com ajuda da IDE para React chamada **[Rekit](https://github.com/supnate/rekit)**, que eu estou testando atualmente e achei muito boa.
Além disso o projeto também usa **Redux** para gerenciamento e compartilhamento de estado.

Você pode ver o resultado final no meu site (https://react-blog.matheusvicente.ga/), no Heroku: (http://react-blog-rekit.herokuapp.com/) ou você pode ver nos gifs abaixo:

### Visualizando post
![Visualizando](https://thumbs.gfycat.com/FaithfulAliveAnemonecrab-size_restricted.gif)

## Criando novo post
![Criando](https://thumbs.gfycat.com/ShowyApprehensiveAsiantrumpetfish-size_restricted.gif)

## Editando posts
![Editando](https://thumbs.gfycat.com/CloseAdventurousAiredaleterrier-size_restricted.gif)

## Deletando posts
![Deletando](https://thumbs.gfycat.com/PoshCaringAntlion-size_restricted.gif)
