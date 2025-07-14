// Nosso código JavaScript para interagir com o Canvas e o botão.

// 1. Pegar o elemento canvas no HTML usando seu ID.
const canvas = document.getElementById('myCanvas');

// 2. Pegar o "contexto" de desenho 2D do canvas.
// É como pegar o pincel e a paleta de cores para começar a pintar.
// '2d' significa que vamos desenhar em duas dimensões.
const ctx = canvas.getContext('2d');

// 3. Pegar o botão de limpar pelo seu ID.
const clearButton = document.getElementById('clearButton');
// --- Desenho Inicial (para mostrar que o Canvas funciona!) ---

// Vamos desenhar um quadrado simples no meio da tela.
// Isso é só um exemplo para a primeira aula.



// Define a cor de preenchimento (fill) para a próxima forma.
ctx.fillStyle = 'blue';

// Desenha um retângulo preenchido
// rect(x, y, width, height) - x,y é o canto superior esquerdo
ctx.fillRect(50, 50, 100, 100);

// Vamos desenhar um circulo tambem!
ctx.fillStyle = 'red';

// Começa um novo "caminho" (path) para o desenho.
// É importante começar um novo caminho para cada forma complexa.
ctx.beginPath();

// Desenha um arco (que pode ser um círculo completo).
// arc(x, y, radius, startAngle, endAngle, antiClockwise)
// x,y é o centro do círculo.
// Math.PI * 2 é 360 graus em radianos, para fazer um círculo completo.
ctx.arc(300, 200, 50, 0, Math.PI * 2);

// Fecha o caminho (opcional para círculos completos, mas boa prática)
ctx.closePath();

ctx.fill();

ctx.beginPath();

ctx.moveTo(150, 100);
ctx.lineTo(100, 200);
ctx.lineTo(200, 200);

ctx.closePath();

ctx.fillStyle = 'green';

ctx.fill();

/* Losangulo */

ctx.fillStyle = 'purple';
ctx.beginPath();
ctx.moveTo(200, 10);
ctx.lineTo(220, 30);
ctx.lineTo(200, 50);
ctx.lineTo(180, 30);
ctx.closePath();
ctx.fill();

/* Losangulo */

/* Estrela */

ctx.fillStyle = 'gold';
ctx.beginPath();
ctx.moveTo(260, 15);
ctx.lineTo(265, 25);
ctx.lineTo(275, 25);
ctx.lineTo(268, 32);
ctx.lineTo(270, 42);
ctx.lineTo(260, 37);
ctx.lineTo(250, 42);
ctx.lineTo(252, 32);
ctx.lineTo(245, 25);
ctx.lineTo(255, 25);
ctx.closePath();
ctx.fill();

ctx.strokeStyle = 'black';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.arc(30, 100, 18, 0, Math.PI * 2)
ctx.stroke();

ctx.fillStyle = 'orange'
ctx.fillRect(50, 200, 90, 50)

ctx.beginPath();

ctx.moveTo(300, 100);
ctx.lineTo(200, 100);
ctx.lineTo(235, 200);

ctx.closePath();

ctx.fillStyle = 'cyan';

ctx.fill();

ctx.fillStyle = 'pink';
ctx.beginPath();
ctx.moveTo(400, 50);
ctx.lineTo(370, 90);
ctx.lineTo(370, 124);
ctx.lineTo(400, 164);
ctx.lineTo(430, 124);
ctx.lineTo(430, 90);
ctx.lineTo(400, 50);
ctx.closePath();
ctx.fill();

// --- Funcionalidade do Botão Limpar ---

// Adicionar um "ouvinte de evento" (event listener) ao botão.
// Quando o evento 'click' acontecer no 'clearButton',
// a função que passamos como segundo argumento será executada.
clearButton.addEventListener('click', function() {
    // Esta função será executada quando o botão for clicado.

    // Limpar o conteúdo do canvas.
    // clearRect(x, y, width, height)
    // Limpa uma área retangular especificada.
    // Para limpar tudo, usamos (0, 0) como canto superior esquerdo
    // e canvas.width, canvas.height como tamanho total do canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log('Canvas Limpo!');
});