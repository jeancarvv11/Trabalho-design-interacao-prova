class SiteFooter extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                footer {
                    margin-top: var(--espacamento-grande, 2rem);
                    background-color: var(--cor-fundo-destaque);
                    color: var(--cor-texto-claro);
                    text-align: center;
                    padding: var(--espacamento-medio);
                    font-family: var(--fonte-principal);
                }
                p {
                    margin: 0;
                }
            </style>
            <footer>
                <p>Desenvolvido por Jean Carlo — Interação Web — 2026</p>
            </footer>
        `;
    }
}

customElements.define('site-footer', SiteFooter);
