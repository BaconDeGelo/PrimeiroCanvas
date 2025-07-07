const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
console.log('Tamanho do canvas:', canvas.width, 'x', canvas.height);

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
    ctx.fillRect(x - size / 2, y - size / 2, size, size)
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
// --- Desenhos Iniciais (agora usando nossas "mini-receitas" de função!) ---
// Para mostrar que o Canvas funciona, vamos desenhar algumas formas
// usando as mesmas funções que usamos quando você clica!
// Assim, podemos ver como as funções nos ajudam a organizar e reutilizar o código.
drawSquare(ctx, 30, 30, 40, 'orange');
drawCircle(ctx, 90, 30, 40, 'green');
drawTriangle(ctx, 150, 30, 40, 'yellow');