const dadosProva = {
    titulo: 'Prova On-line',
    descricao: 'Responda a todas as questões e clique em corrigir para ver o resultado.',
    questoes: [
        {
            pergunta: 'Qual método JavaScript é usado para criar um Shadow DOM dentro de um elemento?',
            alternativas: [
                { id: 'a', texto: 'appendShadow()' },
                { id: 'b', texto: 'createShadowElement()' },
                { id: 'c', texto: 'attachShadow()' }
            ],
            respostaCorreta: 'c'
        },
        {
            pergunta: 'Qual é a principal função do elemento <slot> em Web Components?',
            alternativas: [
                { id: 'a', texto: 'Permitir a inserção de conteúdo externo dentro do Shadow DOM.' },
                { id: 'b', texto: 'Criar formulários de testes on-line dinâmicos.' },
                { id: 'c', texto: 'Estilizar elementos internos usando CSS global.' }
            ],
            respostaCorreta: 'a'
        },
        {
            pergunta: 'Para ser válido, o nome de uma tag personalizada (Custom Element) deve:',
            alternativas: [
                { id: 'a', texto: 'Ter apenas letras maiúsculas.' },
                { id: 'b', texto: 'Conter obrigatoriamente um hífen (-).' },
                { id: 'c', texto: 'Ser registrado diretamente no arquivo CSS.' }
            ],
            respostaCorreta: 'b'
        }
    ]
};

function escaparHtml(texto) {
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

class MyTest extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.dados = dadosProva;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const questoes = this.dados.questoes;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                .prova {
                    max-width: 800px;
                    margin: var(--espacamento-grande, 2rem) auto;
                    padding: var(--espacamento-grande, 2rem);
                    background-color: #ffffff;
                    color: var(--cor-texto, #1a1a1a);
                    font-family: var(--fonte-principal, Arial, sans-serif);
                    border: 1px solid var(--cor-borda, #cccccc);
                    border-radius: var(--borda-raio, 8px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                }

                * {
                    box-sizing: border-box;
                }

                .prova-header {
                    margin-bottom: 1.5rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 2px solid var(--cor-fundo-destaque, #1c1c1c);
                }

                .prova-header h2 {
                    margin: 0 0 0.5rem;
                    font-size: 1.6rem;
                    color: var(--cor-fundo-destaque, #1c1c1c);
                }

                .prova-header p {
                    margin: 0;
                }

                fieldset.questao-card {
                    min-width: 0;
                    margin: 0 0 1.25rem;
                    padding: 1.25rem;
                    background-color: #f8f9fa;
                    border: 1px solid var(--cor-borda, #cccccc);
                    border-radius: var(--borda-raio, 8px);
                }

                legend {
                    padding: 0 0.5rem;
                    font-weight: bold;
                    color: var(--cor-hover, #555555);
                }

                .enunciado {
                    margin: 0 0 1rem;
                    font-size: 1.05rem;
                    font-weight: 600;
                    overflow-wrap: anywhere;
                }

                .opcao-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin: 0.5rem 0;
                    padding: 0.6rem 0.75rem;
                    background-color: #ffffff;
                    border: 1px solid var(--cor-borda, #cccccc);
                    border-radius: var(--borda-raio, 8px);
                    transition: background-color 0.2s ease, border-color 0.2s ease;
                }

                .opcao-item:hover {
                    background-color: #f0f0f0;
                }

                .opcao-item:has(input:checked) {
                    border-color: var(--cor-fundo-destaque, #1c1c1c);
                    background-color: #ececec;
                }

                .opcao-item input[type="radio"] {
                    flex-shrink: 0;
                    width: 18px;
                    height: 18px;
                    margin: 0;
                    cursor: pointer;
                    accent-color: var(--cor-fundo-destaque, #1c1c1c);
                }

                .opcao-item label {
                    flex: 1;
                    cursor: pointer;
                    line-height: 1.4;
                    overflow-wrap: anywhere;
                }

                .btn-enviar,
                .btn-reiniciar {
                    margin-top: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background-color: var(--cor-fundo-destaque, #1c1c1c);
                    color: var(--cor-texto-claro, #f4f4f4);
                    border: none;
                    border-radius: var(--borda-raio, 8px);
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }

                .btn-enviar:hover,
                .btn-reiniciar:hover,
                .btn-enviar:focus-visible,
                .btn-reiniciar:focus-visible {
                    background-color: var(--cor-hover, #555555);
                }

                .resultado-box {
                    padding: 1.25rem;
                    background-color: #f4f4f4;
                    border-left: 4px solid var(--cor-fundo-destaque, #1c1c1c);
                    border-radius: var(--borda-raio, 8px);
                }

                .resultado-box h3 {
                    margin: 0 0 0.5rem;
                    font-size: 1.3rem;
                }

                .resultado-box h4 {
                    margin: 1rem 0 0.5rem;
                }

                .detalhe-resposta {
                    margin: 0.75rem 0;
                    padding: 0.75rem 1rem;
                    background: #ffffff;
                    border: 1px solid var(--cor-borda, #cccccc);
                    border-radius: var(--borda-raio, 8px);
                    overflow-wrap: anywhere;
                }

                .detalhe-resposta p {
                    margin: 0.25rem 0;
                }

                .detalhe-resposta.correta {
                    border-left: 4px solid #28a745;
                }

                .detalhe-resposta.incorreta {
                    border-left: 4px solid #dc3545;
                }

                .status-correta {
                    color: #1e7e34;
                    font-weight: bold;
                }

                .status-incorreta {
                    color: #bd2130;
                    font-weight: bold;
                }

                @media (max-width: 600px) {
                    .prova {
                        margin: var(--espacamento-medio, 1rem);
                        padding: var(--espacamento-medio, 1rem);
                    }

                    fieldset.questao-card {
                        padding: 0.75rem;
                    }

                    .btn-enviar,
                    .btn-reiniciar {
                        width: 100%;
                    }
                }
            </style>

            <div class="prova">
            <div class="prova-header">
                <h2>${escaparHtml(this.dados.titulo)}</h2>
                <p>${escaparHtml(this.dados.descricao)}</p>
            </div>

            <form id="quiz-form">
                ${questoes.map((q, i) => `
                    <fieldset class="questao-card" aria-describedby="enunciado_${i}">
                        <legend>Questão ${i + 1}</legend>
                        <p class="enunciado" id="enunciado_${i}">${escaparHtml(q.pergunta)}</p>
                        ${q.alternativas.map((alt) => `
                            <div class="opcao-item">
                                <input type="radio" id="q${i}_alt_${escaparHtml(alt.id)}" name="questao_${i}" value="${escaparHtml(alt.id)}" required>
                                <label for="q${i}_alt_${escaparHtml(alt.id)}">${escaparHtml(alt.texto)}</label>
                            </div>
                        `).join('')}
                    </fieldset>
                `).join('')}
                <button type="submit" class="btn-enviar">Corrigir prova</button>
            </form>

            <div id="resultado-container" role="status" aria-live="polite" hidden></div>
            </div>
        `;

        this.shadowRoot.querySelector('#quiz-form').addEventListener('submit', (e) => this.corrigirProva(e));
    }

    corrigirProva(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const questoes = this.dados.questoes;
        let acertos = 0;
        let relatorio = '';

        questoes.forEach((q, i) => {
            const respUsuario = formData.get(`questao_${i}`);
            const altUsuario = q.alternativas.find((a) => a.id === respUsuario);
            const altCorreta = q.alternativas.find((a) => a.id === q.respostaCorreta);
            const acertou = respUsuario === q.respostaCorreta;

            if (acertou) {
                acertos++;
            }

            relatorio += `
                <div class="detalhe-resposta ${acertou ? 'correta' : 'incorreta'}">
                    <p><strong>Questão ${i + 1}:</strong> ${escaparHtml(q.pergunta)}</p>
                    <p><strong>Sua resposta:</strong> ${altUsuario ? escaparHtml(altUsuario.texto) : 'Não respondida'}</p>
                    <p><strong>Resposta correta:</strong> ${altCorreta ? escaparHtml(altCorreta.texto) : '-'}</p>
                    <p class="${acertou ? 'status-correta' : 'status-incorreta'}">${acertou ? '✓ Você acertou' : '✗ Você errou'}</p>
                </div>
            `;
        });

        const nota = ((acertos / questoes.length) * 10).toFixed(1).replace('.', ',');
        const resultado = this.shadowRoot.querySelector('#resultado-container');
        const form = this.shadowRoot.querySelector('#quiz-form');

        form.hidden = true;
        resultado.hidden = false;
        resultado.innerHTML = `
            <div class="resultado-box">
                <h3>Nota: ${nota} / 10</h3>
                <p>Você acertou ${acertos} de ${questoes.length} questões.</p>
                <h4>Correção detalhada</h4>
                ${relatorio}
                <button type="button" id="btn-refazer" class="btn-reiniciar">Refazer prova</button>
            </div>
        `;

        resultado.querySelector('#btn-refazer').addEventListener('click', () => this.reiniciarProva());
        this.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    reiniciarProva() {
        this.render();
        this.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

customElements.define('my-test', MyTest);
