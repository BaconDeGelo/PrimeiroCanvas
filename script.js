const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
console.log('Tamanho do canvas:', canvas.width, 'x', canvas.height);
const shapebtn = document.querySelectorAll('.shape-btn');

const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'cyan', 'gold', 'brown', 'lime', 'teal'];

// Função para escolher um item aleatório de uma lista:
// Esta função vai nos ajudar a sortear uma cor ou uma forma.
// Math.random() gera um número decimal aleatório entre 0 e 0.999...
    // Por exemplo: 0.123, 0.789, 0.456
    // Multiplicamos pelo número de itens na lista (arr.length) para que o número
    // seja do tamanho da nossa lista.
    // Math.floor() arredonda o número para baixo (ex: 7.3 vira 7).
    // Isso nos dá um número inteiro que é um 'índice' válido para a lista (0, 1, 2...).
    
function getRamdomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// Lista de funções de desenho para escolher aleatoriamente:
// Esta é uma lista especial! Ela não contém cores ou números, mas sim as nossas "mini-receitas" de desenho!
// Assim, podemos sortear qual mini-receita (função) queremos usar.

const drawFunctions = [
    drawSquare,
    drawCircle,
    drawTriangle,
    drawDiamond,
    drawRectangle,
    drawTrianglePC
]

// --- Funcionalidade do Botão Limpar ---
// Vamos ensinar o botão 'Limpar' a fazer algo quando clicado.
// Adicionar um "ouvinte de evento" (event listener) ao botão.
// É como dizer: "Botão, preste atenção! Quando alguém 'clicar' em você,
// execute a função que vou te dar agora."
clearButton.addEventListener('click', function() {
    // Esta função será executada SOMENTE quando o botão for clicado.
    // Limpar o conteúdo do canvas.
    // ctx.clearRect(x, y, width, height)
    // Limpa uma área retangular. Para limpar TUDO, usamos:
    // (0, 0): Começa a limpar do canto superior esquerdo.
    // canvas.width, canvas.height: Limpa até o final da largura e altura do canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
// --- NOVO: Adicionando o Event Listener no canvas para cliques! ---
// Agora, vamos fazer o nosso canvas "escutar" quando alguém clica nele.
// canvas.addEventListener('click', function(event) { ... });
// Isso significa: "Canvas, preste atenção! Quando acontecer um 'click' em você,
// execute a função que está aqui dentro, e me dê informações sobre o 'evento' (o clique)."
canvas.addEventListener('click', function(event) {
    // 'event' é um objeto que contém informações sobre o clique, como onde ele aconteceu!

    // Pegar as coordenadas (onde o lápis tocou o papel) do clique dentro do canvas:
    // 'rect' nos ajuda a descobrir onde o canvas está na tela.
    const rect = canvas.getBoundingClientRect();
    // event.clientX e event.clientY são as coordenadas do clique na tela inteira.
    // Subtraímos rect.left e rect.top para ter as coordenadas EXATAS dentro do nosso canvas.
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log(`X=${x}, Y=${y}`);
    // Escolher uma cor e uma forma aleatória:
    // Usamos nossa função 'getRandomItem' para sortear uma cor da lista 'colors'.
    const ramdomColor = getRamdomItem(colors);
    // E sorteamos uma das nossas "mini-receitas" de desenho da lista 'drawFunctions'.
    const ramdomDrawFunction = getRamdomItem(drawFunctions);

    const shapeSize = 30;
    ramdomDrawFunction(ctx, x, y, shapeSize, ramdomColor);
});
// --- O QUE É UMA FUNÇÃO? ---
// Pense em uma FUNÇÃO como uma "mini-receita" ou um "conjunto de instruções"
// que tem um nome. Você pode chamar essa mini-receita a qualquer momento
// para que o computador execute todas as instruções que estão dentro dela.
// É como ter um botão que, quando você aperta, faz várias coisas de uma vez!
// Usamos funções para organizar nosso código e não precisar repetir as mesmas instruções.
// Por exemplo, em vez de escrever todos os passos para desenhar um quadrado várias vezes,
// criamos uma função 'drawSquare' e só precisamos dizer: "drawSquare, desenhe um quadrado aqui!"

// --- Funções para desenhar as diferentes formas, centralizadas no ponto (x,y): ---
// Cada uma dessas é uma "mini-receita" para desenhar uma forma específica.
// Elas recebem "ingredientes" (parâmetros) como:
// - ctx: A nossa caixa de ferramentas de desenho.
// - x, y: Onde o centro da forma deve estar no canvas.
// - size: O tamanho da forma (ex: 50 pixels).
// - color: A cor que a forma deve ter.

function drawSquare(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
}

function drawCircle(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    // Desenha o circulo. x, y são  o centro . size/2 é o raio (do centro até a borda).
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function drawTriangle(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.closePath();
    ctx.fill();
}

function drawDiamond(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    /* Ponto de cima */
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x - size / 2, y);
    ctx.closePath();
    ctx.fill();
}

function drawCircleBorder(ctx, x, y, color, size, intencity) {
    ctx.strokeStyle = color;
    ctx.lineWidth = intencity;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.stroke();
}

function drawRectangle(ctx, x, y, color, size) {
    const width = size;
    const height = size / 2;
    ctx.fillStyle = color;
    ctx.fillRect(x - width / 2, y - height / 2, width, height);
}

function drawRectangleV(ctx, x, y, color, size) {
    const width = size / 2;
    const height = size;
    ctx.fillStyle = color;
    ctx.fillRect(x + width / 2, y - height / 2, width, height);
}

function drawTrianglePC(ctx, x, y, color, size, intencity) {
    ctx.fillStyle = color;
    ctx,lineWidth = intencity;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - size);
    ctx.lineTo(x, y + size);
    ctx.closePath();
    ctx.stroke();
    ctx.fill()
}
// --- Desenhos Iniciais (agora usando nossas "mini-receitas" de função!) ---
// Para mostrar que o Canvas funciona, vamos desenhar algumas formas
// usando as mesmas funções que usamos quando você clica!
// Assim, podemos ver como as funções nos ajudam a organizar e reutilizar o código.
/*drawSquare(ctx, 30, 30, 40, 'orange');
drawCircle(ctx, 90, 30, 40, 'green');
drawTriangle(ctx, 150, 30, 40, 'yellow');
drawDiamond(ctx, 270, 30, 40, 'blue');
drawCircleBorder(ctx, 210, 30, 'black', 20, 3);
drawRectangle(ctx, 30, 90, 'pink', 30);
drawRectangleV(ctx, 90, 90, 'purple', 30);
drawTrianglePC(ctx, 150, 90, 'cyan', 30, 3)*/