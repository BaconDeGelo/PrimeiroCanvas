const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
const shapeBtns = document.querySelectorAll('.shapebtn');

let selectedShapeType = null;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight

console.log('Canvas inicializado com dimensões:', canvas.width, 'x', canvas.height);

function drawStar(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    const outerRadius = size / 2;
    const innerRadius = outerRadius / 2.5;
    const numPoints = 5;

    for (let i = 0; i < numPoints; i++) {
        const outerAngle = (i * 2 * Math.PI / numPoints) - (Math.PI / 2);
        const innerAngle = outerAngle + (Math.PI / numPoints);

        ctx.lineTo(x + outerRadius * Math.cos(outerAngle), y + outerRadius * Math.sin(outerAngle));
        ctx.lineTo(x + innerRadius * Math.cos(innerAngle), y + innerRadius * Math.sin(innerAngle));
    }

    ctx.closePath();
    ctx.fill();
}

function drawHexagon(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    const radius = size / 2;
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const px = x + radius * Math.cos(angle);
        const py = y + radius * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.closePath();
    ctx.fill();
}

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

const shapeDrawMap = {
    'square': drawSquare,
    'circle': drawCircle,
    'triangle': drawTriangle,
    'diamond': drawDiamond,
    'star': drawStar,
    'rectangle': drawRectangle,
    'invertedTriangle': drawTrianglePC,
    'hexagon': drawHexagon
}

const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'cyan', 'gold', 'brown', 'lime', 'teal'];

clearButton.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function getRamdomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// NOVO: Aqui, o computador "escuta" cada um dos botões de forma.
shapeBtns.forEach(button => {
    button.addEventListener('click', function() {
        // NOVO: Primeiro, ele tira o "destaque" (a cor diferente) de TODOS os botões.
        shapeBtns.forEach(btn => btn.classList.remove('active'));
        // NOVO: Depois, ele coloca o "destaque" (a cor diferente) SÓ no botão que você acabou de clicar.
        // na nossa "caixinha de memória" 
        selectedShapeType = this.dataset.shape;
        console.log(`Forma selecionada: ${selectedShapeType}`);
    });
});

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`Você clicou em: X=${x}, Y=${y}`);
    const ramdomColor = getRamdomItem(colors);
    const shapeSize = 50;

    if (selectedShapeType && shapeDrawMap[selectedShapeType]) {
        const drawFunction = shapeDrawMap[selectedShapeType];
        drawFunction(ctx, x, y, shapeSize, ramdomColor);
    } else {
        console.log('Erro 001: Nenhuma forma selecionada. tente novamente com uma forma selecionada.');
    }
});