# Trabalho-design-interacao-prova
Site com os trabalhos da disciplina de Interação Web, feito em HTML, CSS e JavaScript puro.
# Trabalhos de Interação Web

Site com os trabalhos da disciplina de Interação Web, feito com HTML, CSS e JavaScript puro (sem frameworks nem bibliotecas).

## Páginas

- **Apresentação** (`index.html`): explica o objetivo do site.
- **Trabalho 1 - Editor de Menus** (`editor-menus.html`): formulário para montar um menu e ver o resultado na hora.
- **Trabalho 2 - Prova On-line** (`prova.html`): prova de múltipla escolha com correção e nota.

## Como funciona

- O cabeçalho, o menu e o rodapé são web components (`<site-header>`, `<site-nav>` e `<site-footer>`), escritos uma vez só e usados em todas as páginas.
- A prova é um web component (`<my-test>`). As questões ficam em um objeto no arquivo `js/componentes/my-test.js`. Para criar uma questão nova, basta acrescentar um item nesse objeto.

## Como rodar

Abra a pasta no VS Code e use a extensão **Live Server** (botão direito em `index.html` > Open with Live Server).

## Autor

Jean Carlo - Interação Web - 2026
