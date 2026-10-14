const listaItens = document.getElementById('lista-itens-menu');
const btnAdicionar = document.getElementById('btn-adicionar-item');

const corFundoMenu = document.getElementById('cor-fundo-menu');
const corFundoItem = document.getElementById('cor-fundo-item');
const corTextoItem = document.getElementById('cor-texto-item');
const corBordaItem = document.getElementById('cor-borda-item');
const previewMenu = document.getElementById('preview-menu');

const sliderEspacamento = document.getElementById('espacamento-itens');
const valorEspacamento = document.getElementById('valor-espacamento');

const sliderFonte = document.getElementById('tamanho-fonte-item');
const valorFonte = document.getElementById('valor-tamanho-fonte');

const sliderBorda = document.getElementById('espessura-borda-item');
const valorBorda = document.getElementById('valor-espessura-borda');

const sliderArredondamento = document.getElementById('arredondamento-item');
const valorArredondamento = document.getElementById('valor-arredondamento');

const inputImagem = document.getElementById('input-imagem');
const radioPosicaoCima = document.getElementById('posicao-cima');
const radioPosicaoLado = document.getElementById('posicao-lado');

let imagemSelecionada = null;

const MAX_ITENS = 6;
const MIN_ITENS = 2;

function adicionarItem() {
    const quantidadeAtual = listaItens.children.length;

    if (quantidadeAtual >= MAX_ITENS) {
        return;
    }

    const linha = document.createElement('div');
    linha.className = 'item-menu-linha';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Nome do item';
    input.maxLength = 20;

    input.addEventListener('input', gerarPreview);

    const btnRemover = document.createElement('button');
    btnRemover.type = 'button';
    btnRemover.textContent = 'x';
    btnRemover.className = 'btn-remover-item';

    btnRemover.addEventListener('click', function () {
        removerItem(linha);
    });

    linha.appendChild(input);
    linha.appendChild(btnRemover);

    listaItens.appendChild(linha);

    gerarPreview();
}

function removerItem(linha) {
    const quantidadeAtual = listaItens.children.length;

    if (quantidadeAtual <= MIN_ITENS) {
        return;
    }

    linha.remove();

    gerarPreview();
}

function conectarSliderComValor(slider, span) {
    slider.addEventListener('input', function () {
        span.textContent = slider.value + 'px';
        gerarPreview();
    });
}

function gerarPreview() {
    previewMenu.innerHTML = '';

    const menu = document.createElement('nav');
    menu.style.display = 'flex';
    menu.style.backgroundColor = corFundoMenu.value;
    menu.style.padding = '10px';
    menu.style.borderRadius = '8px';
    menu.style.gap = sliderEspacamento.value + 'px';

    const linhasDeItens = listaItens.children;

    for (let i = 0; i < linhasDeItens.length; i++) {
        const inputTexto = linhasDeItens[i].querySelector('input[type="text"]');
        const textoItem = inputTexto.value || 'Item';

        const itemMenu = document.createElement('span');
        itemMenu.textContent = textoItem;
        itemMenu.style.backgroundColor = corFundoItem.value;
        itemMenu.style.color = corTextoItem.value;
        itemMenu.style.fontSize = sliderFonte.value + 'px';
        itemMenu.style.border = sliderBorda.value + 'px solid ' + corBordaItem.value;
        itemMenu.style.borderRadius = sliderArredondamento.value + 'px';
        itemMenu.style.padding = '8px 14px';

        menu.appendChild(itemMenu);
    }

    if (!imagemSelecionada) {
        previewMenu.appendChild(menu);
        return;
    }

    const imagem = document.createElement('img');
    imagem.src = imagemSelecionada;
    imagem.style.maxWidth = '150px';
    imagem.style.borderRadius = '8px';

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = '16px';
    container.style.alignItems = 'center';

    if (radioPosicaoCima.checked) {
        container.style.flexDirection = 'column';
    } else {
        container.style.flexDirection = 'row';
    }

    container.appendChild(imagem);
    container.appendChild(menu);
    previewMenu.appendChild(container);
}

function lerImagemSelecionada() {
    const arquivo = inputImagem.files[0];

    if (!arquivo) {
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function () {
        imagemSelecionada = leitor.result;
        gerarPreview();
    };

    leitor.readAsDataURL(arquivo);
}

btnAdicionar.addEventListener('click', adicionarItem);

conectarSliderComValor(sliderEspacamento, valorEspacamento);
conectarSliderComValor(sliderFonte, valorFonte);
conectarSliderComValor(sliderBorda, valorBorda);
conectarSliderComValor(sliderArredondamento, valorArredondamento);

corFundoMenu.addEventListener('input', gerarPreview);
corFundoItem.addEventListener('input', gerarPreview);
corTextoItem.addEventListener('input', gerarPreview);
corBordaItem.addEventListener('input', gerarPreview);
inputImagem.addEventListener('change', lerImagemSelecionada);
radioPosicaoCima.addEventListener('change', gerarPreview);
radioPosicaoLado.addEventListener('change', gerarPreview);

adicionarItem();
adicionarItem();
