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

// Preenche o círculo com a cor atual (vermelho).
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