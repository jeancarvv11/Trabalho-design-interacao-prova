class SiteHeader extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                header {
                    background-color: var(--cor-fundo-destaque, #1c1c1c);
                    color: var(--cor-texto-claro, #f4f4f4);
                    padding: var(--espacamento-medio, 1rem) var(--espacamento-grande, 2rem);
                    font-family: var(--fonte-principal, Arial, sans-serif);
                }
                .titulo {
                    margin-bottom: var(--espacamento-medio, 1rem);
                }
                h1 {
                    margin: 0;
                    font-size: var(--tamanho-titulo, 2rem);
                    line-height: 1.2;
                }
            </style>
            <header>
                <div class="titulo">
                    <slot name="titulo"><h1>Trabalhos de Interação Web</h1></slot>
                </div>
                <slot></slot>
            </header>
        `;
    }
}

customElements.define('site-header', SiteHeader);
