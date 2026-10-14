class SiteNav extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--espacamento-medio, 1rem);
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
                a {
                    display: inline-block;
                    color: var(--cor-texto-claro, #f4f4f4);
                    font-family: var(--fonte-principal, Arial, sans-serif);
                    font-weight: bold;
                    text-decoration: none;
                    padding: var(--espacamento-pequeno, 0.5rem);
                    border-radius: var(--borda-raio, 8px);
                    transition: background-color 0.2s ease;
                }
                a:hover,
                a:focus-visible {
                    background-color: var(--cor-hover, #555555);
                }
            </style>
            <nav>
                <ul>
                    <li><a href="index.html">Apresentação</a></li>
                    <li><a href="editor-menus.html">Trabalho 1 - Editor de Menus</a></li>
                    <li><a href="prova.html">Trabalho 2 - Prova On-line</a></li>
                    <li><a href="trabalho3.html">Trabalho 3</a></li>
                </ul>
            </nav>
        `;
    }
}

customElements.define('site-nav', SiteNav);
