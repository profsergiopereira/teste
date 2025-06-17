// ==========================================================
// Variáveis Globais
// ==========================================================
let telaAtual = 0; // 0: Tela Inicial, 1: Ano 2023, 2: Ano 2024, 3: Detalhe do Projeto
let projetosAno2023 = [];
let projetosAno2024 = [];
let projetoSelecionado = null; // Armazena o projeto clicado para exibir detalhes

// Variáveis para elementos visuais dinâmicos e tema "Campo-Cidade"
let corCeuCampo;
let corCeuCidade;
let corTerraCampo;
let corEdificiosCidade;
// Você pode carregar imagens e fontes aqui. Descomente e ajuste os caminhos.
// let imgCampoPaisagem;
// let imgCidadePaisagem;
// let fonteTitulo;

// Variáveis para interação criativa (sistema de partículas)
let particulas = [];
const NUM_PARTICULAS_CLIQUE = 15; // Quantidade de partículas geradas por clique

// ==========================================================
// Pré-Carregamento (preload)
// Carrega recursos como imagens, fontes e sons antes do setup ser executado.
// Isso garante que os recursos estejam prontos antes de serem usados no desenho.
// ==========================================================
function preload() {
    // Exemplo de carregamento de recursos:
    // imgCampoPaisagem = loadImage('assets/paisagem_campo.png');
    // imgCidadePaisagem = loadImage('assets/paisagem_cidade.png');
    // fonteTitulo = loadFont('assets/SuaFonteCustomizada.ttf');

    // Inicializa dados dos projetos (fictícios para demonstração).
    // Em um projeto real, você poderia carregar isso de um JSON, por exemplo.
    projetosAno2023 = [
        { id: 1, titulo: "Horta Sustentável na Escola", descricao: "Este projeto inovador transformou o pátio da escola em uma horta orgânica vibrante, ensinando os alunos sobre permacultura, consumo consciente e a importância da conexão com a natureza. Os produtos colhidos foram usados na merenda e doados à comunidade local, fortalecendo laços entre campo e cidade.", imagem: "horta_sustentavel.png" },
        { id: 2, titulo: "App do Produtor Local", descricao: "Desenvolvimento de um aplicativo mobile para conectar pequenos produtores rurais a consumidores urbanos. Através do app, os produtores podem anunciar seus produtos frescos, e os moradores da cidade podem comprá-los diretamente, diminuindo intermediários e promovendo o comércio justo. Uma ponte digital entre campo e cidade!", imagem: "app_produtor.png" },
        { id: 3, titulo: "Arte Rupestre Contemporânea", descricao: "Uma iniciativa cultural que explorou a herança artística das comunidades rurais e a reinterpretou em murais urbanos. Artistas locais e estudantes colaboraram para criar obras que celebram a vida no campo e sua influência na cultura da cidade, usando técnicas mistas e sustentáveis.", imagem: "arte_rupestre.png" }
    ];

    projetosAno2024 = [
        { id: 4, titulo: "Energia Renovável no Campo", descricao: "Pesquisa e implementação de soluções de energia solar e eólica em propriedades rurais, visando a autossuficiência energética e a redução do impacto ambiental. O projeto demonstrou como a inovação tecnológica pode beneficiar o setor agrícola.", imagem: "energia_renovavel.png" },
        { id: 5, titulo: "Arquitetura Biofílica Urbana", descricao: "Desenvolvimento de propostas arquitetônicas para edifícios urbanos que integram elementos naturais, como jardins verticais e telhados verdes. O objetivo é trazer a 'sensação de campo' para dentro da cidade, promovendo bem-estar e biodiversidade.", imagem: "arquitetura_biofilica.png" },
        { id: 6, titulo: "Gastronomia da Roça na Cidade", descricao: "Um festival gastronômico que trouxe sabores autênticos do campo para restaurantes urbanos. Cheffs rurais e urbanos colaboraram para criar pratos inovadores, destacando ingredientes frescos e a cultura culinária do interior. Uma verdadeira festa de sabores!", imagem: "gastronomia_roca.png" }
    ];
}

// ==========================================================
// Setup: Configurações Iniciais do Canvas e Parâmetros
// Esta função é executada apenas uma vez no início.
// ==========================================================
function setup() {
    createCanvas(windowWidth, windowHeight); // O canvas preenche a janela
    // if (fonteTitulo) textFont(fonteTitulo); // Aplica a fonte se carregada
    textSize(18);
    textAlign(CENTER, CENTER); // Alinha o texto ao centro por padrão
    rectMode(CENTER); // Retângulos são desenhados a partir do centro
    angleMode(DEGREES); // Usa graus para rotações, mais intuitivo para humanos

    // Define as cores base para o tema Campo-Cidade
    corCeuCampo = color(135, 206, 235); // Azul céu claro
    corCeuCidade = color(100, 100, 150); // Azul acinzentado (poluído/noturno)
    corTerraCampo = color(139, 69, 19); // Marrom terra
    corEdificiosCidade = color(120, 120, 120); // Cinza dos prédios
}

// ==========================================================
// Draw: Loop Principal de Desenho
// Esta função é executada continuamente a cada frame (60 vezes por segundo por padrão).
// ==========================================================
function draw() {
    // Atualiza e desenha as partículas em cada frame
    for (let i = particulas.length - 1; i >= 0; i--) {
        particulas[i].update();
        particulas[i].show();
        // Remove partículas que já terminaram sua vida útil para otimizar
        if (particulas[i].isFinished()) {
            particulas.splice(i, 1);
        }
    }

    // Lógica para desenhar a tela correta com base na variável 'telaAtual'
    if (telaAtual === 0) {
        desenhaTelaInicial();
    } else if (telaAtual === 1) {
        desenhaTelaAno(2023, projetosAno2023);
    } else if (telaAtual === 2) {
        desenhaTelaAno(2024, projetosAno2024);
    } else if (telaAtual === 3 && projetoSelecionado) { // Garante que há um projeto selecionado
        desenhaDetalheProjeto(projetoSelecionado);
    }
}

// ==========================================================
// Funções de Desenho Específicas para Cada Tela
// ==========================================================

/**
 * Desenha a tela inicial do site.
 * Apresenta o título, uma breve introdução e botões para os anos dos projetos.
 */
function desenhaTelaInicial() {
    // Gradiente de fundo que transiciona de campo para cidade baseado na posição X do mouse
    let transicaoCeu = map(mouseX, 0, width, 0, 1);
    let corCeu = lerpColor(corCeuCampo, corCeuCidade, transicaoCeu);
    background(corCeu);

    // Desenho abstrato da paisagem Campo-Cidade
    // Campo (lado esquerdo)
    fill(corTerraCampo);
    // Base da 'montanha' ou 'colina' do campo
    triangle(0, height, width / 2, height, width / 4, height * 0.7);
    fill(60, 170, 60); // Verde para folhagem
    // Algumas 'árvores' simples no campo
    ellipse(width * 0.15, height * 0.68, 50, 80);
    ellipse(width * 0.3, height * 0.75, 70, 100);

    // Cidade (lado direito)
    fill(corEdificiosCidade);
    // Base da 'cidade'
    rect(width * 0.75, height * 0.8, width * 0.5, height * 0.4);
    fill(100);
    // Prédios simples
    rect(width * 0.6, height * 0.7, 80, 180);
    rect(width * 0.8, height * 0.6, 100, 250);
    fill(255, 204, 0, 150); // Janelas iluminadas (transparência para efeito)
    rect(width * 0.8 - 20, height * 0.6 - 70, 15, 20);
    rect(width * 0.8 + 20, height * 0.6 - 100, 15, 20);

    // Título Principal do Site
    fill(255); // Branco para o texto
    textSize(50);
    text("Festejando a Conexão", width / 2, height * 0.2);
    text("Campo-Cidade", width / 2, height * 0.28);

    textSize(24);
    text("Uma Vitrine de Projetos Agrinho", width / 2, height * 0.38);

    // Instruções para o usuário
    textSize(18);
    fill(220, 220, 220); // Cinza claro
    text("Clique nos anos para explorar as inovações!", width / 2, height * 0.5);

    // Botões para Navegação por Ano
    // As coordenadas e tamanhos dos botões são retornados pela função desenhaBotao
    let btn2023 = desenhaBotao(width / 2 - 160, height * 0.7, 280, 70, "Projetos 2023", 'ano2023');
    let btn2024 = desenhaBotao(width / 2 + 160, height * 0.7, 280, 70, "Projetos 2024", 'ano2024');
}

/**
 * Desenha a tela de projetos de um ano específico.
 * Exibe os projetos como "cards" clicáveis em uma grade.
 * @param {number} ano - O ano cujos projetos serão exibidos.
 * @param {Array<Object>} listaProjetos - A lista de objetos de projeto para o ano.
 */
function desenhaTelaAno(ano, listaProjetos) {
    background(240); // Fundo claro para a galeria de projetos

    fill(50);
    textSize(40);
    text(`Projetos do Ano ${ano}`, width / 2, height * 0.1);

    // Layout dos cards de projeto em grade
    let cols = 3; // 3 colunas
    let spacing = 40; // Espaçamento entre os cards e margens
    let cardWidth = (width - spacing * (cols + 1)) / cols;
    let cardHeight = 250;

    for (let i = 0; i < listaProjetos.length; i++) {
        let projeto = listaProjetos[i];
        let col = i % cols;
        let row = floor(i / cols);
        // Calcula a posição central do card
        let x = spacing + col * (cardWidth + spacing) + cardWidth / 2;
        let y = height * 0.25 + row * (cardHeight + spacing) + cardHeight / 2;

        // Efeito de escala ao passar o mouse (interação criativa)
        let distMouse = dist(mouseX, mouseY, x, y);
        let escala = map(distMouse, 0, 150, 1.05, 1.0); // Aumenta 5% ao aproximar o mouse
        escala = constrain(escala, 1.0, 1.05); // Garante que a escala esteja no intervalo

        push(); // Salva o estado atual das transformações (importante para scale)
        translate(x, y); // Move o sistema de coordenadas para o centro do card
        scale(escala); // Aplica a escala
        
        // Desenha o card do projeto
        fill(255); // Fundo branco do card
        stroke(150); // Borda cinza suave
        strokeWeight(1.5);
        rect(0, 0, cardWidth, cardHeight, 15); // Retângulo com bordas arredondadas

        // Título do projeto
        fill(50);
        textSize(22);
        text(projeto.titulo, 0, -cardHeight / 3);

        // Placeholder para imagem do projeto (você pode carregar e desenhar aqui)
        fill(200);
        rect(0, 0, cardWidth * 0.7, cardHeight * 0.4);
        fill(100);
        textSize(14);
        text("Imagem aqui", 0, 0);

        // Dica visual para clicar
        fill(80);
        textSize(16);
        text("Clique para detalhes", 0, cardHeight / 3);

        pop(); // Restaura o estado anterior das transformações
    }

    // Botão de Voltar para a tela inicial
    desenhaBotao(width / 2, height - 70, 180, 60, "Voltar", 'voltar');
}

/**
 * Desenha a tela de detalhes de um projeto específico.
 * Exibe informações mais detalhadas do projeto selecionado.
 * @param {Object} projeto - O objeto do projeto a ser exibido.
 */
function desenhaDetalheProjeto(projeto) {
    background(250, 250, 240); // Fundo quase branco para o detalhe

    fill(30);
    textSize(45);
    text(projeto.titulo, width / 2, height * 0.1);

    // Área para a imagem do projeto
    fill(200);
    // Se você tiver carregado imagens, pode usar:
    // image(imagensProjetos[projeto.imagem], width / 2 - 250, height * 0.25, 500, 300);
    rect(width / 2, height * 0.4, 500, 300); // Placeholder grande
    fill(100);
    textSize(25);
    text("Imagem / Vídeo do Projeto", width / 2, height * 0.4);

    // Descrição detalhada do projeto
    fill(50);
    textSize(18);
    // Para que a descrição se ajuste a uma área, use os parâmetros x, y, largura, altura
    text(projeto.descricao, width / 2, height * 0.75, width * 0.7, height * 0.15); // Ajusta a largura da caixa de texto

    // Link fictício (em um projeto real, você usaria createA ou um botão)
    textSize(16);
    fill(0, 0, 200); // Azul para simular um link
    text("Acesse o Repositório do Projeto (Fictício)", width / 2, height * 0.9);

    // Botão de Voltar
    desenhaBotao(width / 2, height - 70, 180, 60, "Voltar", 'voltar');
}

// ==========================================================
// Funções de Interação e Auxiliares
// ==========================================================

/**
 * Função para desenhar um botão interativo.
 * Controla o estado de hover e o cursor.
 * @param {number} x - Posição X central do botão.
 * @param {number} y - Posição Y central do botão.
 * @param {number} w - Largura do botão.
 * @param {number} h - Altura do botão.
 * @param {string} texto - Texto a ser exibido no botão.
 * @param {string} id - Um identificador único para o botão.
 * @returns {Object} Um objeto contendo as propriedades do botão (incluindo se está hovered).
 */
function desenhaBotao(x, y, w, h, texto, id) {
    // Verifica se o mouse está sobre o botão
    let hovered = mouseX > x - w / 2 && mouseX < x + w / 2 &&
                  mouseY > y - h / 2 && mouseY < y + h / 2;

    if (hovered) {
        fill(70, 180, 100); // Cor mais clara ao passar o mouse
        cursor(HAND); // Muda o cursor para indicar clicável
    } else {
        fill(50, 150, 80); // Cor padrão do botão
        cursor(ARROW); // Cursor padrão
    }
    stroke(25); // Borda escura
    strokeWeight(2);
    rect(x, y, w, h, 15); // Botão com cantos arredondados

    fill(255); // Texto branco
    textSize(22);
    text(texto, x, y);

    return { x: x, y: y, w: w, h: h, id: id, hovered: hovered };
}

/**
 * Função de evento chamada quando o botão do mouse é pressionado.
 * Implementa a lógica de navegação e cliques nos projetos.
 */
function mousePressed() {
    // Gera partículas visuais ao clicar, um toque criativo
    for (let i = 0; i < NUM_PARTICULAS_CLIQUE; i++) {
        particulas.push(new Particle(mouseX, mouseY));
    }

    // Lógica de navegação baseada na tela atual
    if (telaAtual === 0) { // Na tela inicial
        // Verifica cliques nos botões de ano
        if (dist(mouseX, mouseY, width / 2 - 160, height * 0.7) < 140) { // Botão 2023
            telaAtual = 1;
        } else if (dist(mouseX, mouseY, width / 2 + 160, height * 0.7) < 140) { // Botão 2024
            telaAtual = 2;
        }
    } else if (telaAtual === 1 || telaAtual === 2) { // Nas telas de ano (galeria)
        // Verifica clique no botão de Voltar
        if (dist(mouseX, mouseY, width / 2, height - 70) < 90) {
            telaAtual = 0; // Volta para a tela inicial
            projetoSelecionado = null; // Reseta o projeto selecionado
            return; // Sai da função para não verificar cliques em cards
        }

        // Verifica cliques nos cards de projeto
        let listaAtual = (telaAtual === 1) ? projetosAno2023 : projetosAno2024;
        let cols = 3;
        let spacing = 40;
        let cardWidth = (width - spacing * (cols + 1)) / cols;
        let cardHeight = 250;

        for (let i = 0; i < listaAtual.length; i++) {
            let projeto = listaAtual[i];
            let col = i % cols;
            let row = floor(i / cols);
            let x = spacing + col * (cardWidth + spacing) + cardWidth / 2;
            let y = height * 0.25 + row * (cardHeight + spacing) + cardHeight / 2;

            // Verifica se o clique foi dentro da área de um card
            if (mouseX > x - cardWidth / 2 && mouseX < x + cardWidth / 2 &&
                mouseY > y - cardHeight / 2 && mouseY < y + cardHeight / 2) {
                
                projetoSelecionado = projeto;
                telaAtual = 3; // Muda para a tela de detalhe do projeto
                break; // Sai do loop após encontrar o projeto clicado
            }
        }
    } else if (telaAtual === 3) { // Na tela de detalhe do projeto
        // Verifica clique no botão de Voltar
        if (dist(mouseX, mouseY, width / 2, height - 70) < 90) {
            // Volta para a tela do ano de onde o projeto veio
            // Poderia ser mais inteligente e voltar para o ano específico
            telaAtual = (projetoSelecionado.id >= 1 && projetoSelecionado.id <= 3) ? 1 : 2; 
            projetoSelecionado = null; // Limpa o projeto selecionado
        }
    }
}

/**
 * Função para lidar com o redimensionamento da janela do navegador.
 * Garante que o canvas se ajuste ao novo tamanho da janela.
 */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


// ==========================================================
// Classe Particle (Partículas para Efeitos Visuais)
// ==========================================================
class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D(); // Vetor de velocidade aleatório
        this.vel.mult(random(1, 4)); // Aumenta a magnitude da velocidade
        this.acc = createVector(0, 0.1); // Pequena aceleração para baixo (gravidade)
        this.r = random(4, 12); // Raio da partícula
        this.lifespan = 255; // Vida útil da partícula (opacidade)
        this.color = color(random(100, 255), random(100, 255), random(100, 255), this.lifespan); // Cor aleatória e opacidade
    }

    update() {
        this.vel.add(this.acc); // Aplica aceleração
        this.pos.add(this.vel); // Atualiza posição
        this.lifespan -= random(3, 8); // Diminui a vida útil (fica mais transparente)
        this.color.setAlpha(this.lifespan); // Atualiza a opacidade da cor
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }

    isFinished() {
        return this.lifespan < 0; // Retorna true se a partícula já 'morreu'
    }
}