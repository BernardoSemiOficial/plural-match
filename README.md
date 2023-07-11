# Bernardo Pereira - Meu site e blog pessoal

## Pessoal

Nesse site, conta sobre minhas experiências na área de tecnologia (até antes de
eu ter entrado nela), quais cursos já fiz para ingressar na área e como foi meu
início quando decidi que realmente iria me dedicar a estudar para conseguir um
emprego como Desenvolvedor Front-End.

Contarei sobre os projetos que já fiz durante o meu desenvolvimento e quais
cursos e locais de estudo eu busquei para conseguir desenvolver-me (posso até
conta porque tenho duas contas github, por conta de uma infelicidade da vida).

## Blog

Nesse mesmo site, terá uma parte para postagens de Blog de minha autoria. Penso
que serão assuntos ligado as tecnologias que já trabalho atualmente e também
dicas de carreia em Desenvolvimento Front-End.

## Tecnologias

Nas linhas abaixo irei descrever melhor todas as informações sobre o projeto e
quais tecnologias foram utilizadas para seu desenvolvimento.

Nesse projeto, penso em utilizar tecnologias que estão atualmente sendo bem
utilizadas no mercado de Front-End (algumas eu nem tenho tanto conhecimento a
respeito, por nunca ter trabalhado, mas tem tudo para o mercado acabar
aderindo). Entre elas:

### Tecnologias Core

- NextJS
- TypeScript
- Biblioteca CSS-in-JS "zero-runtime"\*
  - [Vanilla-Extract](https://vanilla-extract.style/)
- CMS\*
  - [Strapi](https://strapi.io/)
  - [Prismic](https://prismic.io/docs)
- GraphQL e Apollo
  - [GraphQL](https://graphql.org/)
  - [Apollo](https://www.apollographql.com/)

\*: tecnologias ainda não definida.

### Ambiente

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [CommitLintJS](https://commitlint.js.org/#/)
- [Husky](https://typicode.github.io/husky/#/)
- [Stylelint](https://stylelint.io/)
- [Lint-staged](https://github.com/okonet/lint-staged)

### Inspiração de Layout

O meu projeto é inspirado no [layout](src/docs/layout-jagriti-mishra.png) da
[Jagriti Mishra](https://www.behance.net/jagritimishra2) no site que ela deixou
disponível: [link](https://jagriti-blog.netlify.app/#) e também no site pessoal
do Felipe Fialho que ele tem disponível: [link](https://www.felipefialho.com/)

### Backlog - tech

- [] A ferramenta Stylelint ainda não suporta a análise de código CSS que vem de
  bibliotecas como Vanilla Extract e Stitches. Isso é o que diz a própria
  documentação do Stylelint na migração para a
  [versão 15](https://stylelint.io/migration-guide/to-15/), que é a mais atual.

### Atividades

#### Página de Projetos

Criar a página consumindo a API do GitHub para consumir todos os repositórios
que existem na minha conta pessoal. Deve conter título, descrição, tecnologias
utilizadas e link para o repositório.

Nessa página deve conter as tecnologias que já trabalhei na carreira de forma
geral.

#### Página de Contato

Criar redirecionamento para as minhas redes sociais para entrar em contato.

Criar uma parte com formulário que permite o contato do usuário comigo, através
do meu e-mail pessoal (bernardo.258@hotmail.com).

Bibliotecas:

- [mailgun](https://www.mailgun.com/es/productos/envios/smtp/)
- [nodemailer](https://nodemailer.com/about/)

#### Página de Blog

Criar uma página com listagem de postagens do meu Blog. Nessa listagem deve ter
título, descrição, tempo de leitura, área de tecnologia e redirecionamento para
ser mais informações.

Criar página individual da postagem com título, descrição, tempo de leitura,
área de tecnologia e conteúdo. No final da página deve ter recomendação de
outras postagens que já foram lançadas.
