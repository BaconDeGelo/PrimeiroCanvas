const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
const shapeBtns = document.querySelectorAll('.shape-btn'); 

let selectedColor = 'red';

let selectedShapeType = null;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function drawSquare(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
}


function drawCircle(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}


function drawRectangle(ctx, x, y, size, color) {
    const width = size;
    const height = size / 2;
    ctx.fillStyle = color;
    ctx.fillRect(x - width / 2, y - height / 2, width, height);
}


function drawDiamond(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x - size / 2, y);
    ctx.closePath();
    ctx.fill();
}


function drawInvertedTriangle(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - size / 2, y - size / 2);
    ctx.lineTo(x + size / 2, y - size / 2);
    ctx.lineTo(x, y + size / 2);
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
    const angle = Math.PI * 2 / 6;
    for (let i = 0; i < 6; i++) {
        ctx.lineTo(x + size / 2 * Math.cos(angle * i), y + size / 2 * Math.sin(angle * i));
    }
    ctx.closePath();
    ctx.fill();
}


function drawSpiral(ctx, x, y, loops, points, color) {
    ctx.beginPath();
    for (let i = 0; i < points; i++) {
        let angle = (i / points) * loops * 2 * Math.PI;
        let radius = i * 2;
        let px = x + Math.cos(angle) * radius;
        let py = y + Math.sin(angle) * radius;
        ctx.lineTo(px, py);
    }
    ctx.strokeStyle = color;
    ctx.stroke();
}


function drawFlower(ctx, x, y, radius, petals, color) {
    for (let i = 0; i < petals; i++) {
        let angle = (i * 2 * Math.PI) / petals;
        let cx = x + Math.cos(angle) * radius;
        let cy = y + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(cx, cy, radius / 3, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }
}


// NOVO:
//  Esta é como uma "lista de instruções" que diz ao computador
// //qual função de desenho usar para cada nome de forma (por exemplo, se o nome é "square", use a função drawSquare).
const shapeDrawMap = {
    'square': drawSquare,
    'circle': drawCircle,
    'triangle': drawTriangle,
    'diamond': drawDiamond,
    'star': drawStar,
    'rectangle': drawRectangle,
    'invertedTriangle': drawInvertedTriangle,
    'hexagon': drawHexagon
};




clearButton.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


shapeBtns.forEach(button => {
    button.addEventListener('click', function() {
        shapeBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        selectedShapeType = this.dataset.shape;
        console.log(`Forma selecionada: ${selectedShapeType}`);
    });
});

// ---- NOVO: COR ---- //
// Agora vamos selecionar a cor que queremos desenhar!
// Quando a pessoa clica num botão de cor:
colorBtns.forEach(button => {
    button.addEventListener('click', function () {
        // Primeiro tiramos o destaque de todos os outros botões de cor
        colorBtns.forEach(btn => btn.classList.remove('active'));
        // Agora este botão fica marcado, mostrando qual cor está ativa
        this.classList.add('active');
        // Pegamos a cor desse botão para usar quando desenhar
        selectedColor = this.dataset.color;
        console.log(`Cor selecionada: ${selectedColor}`);
    });
});

colorBtns[0].classList.add('active');

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const shapeSize = 50;
    if (selectedShapeType && shapeDrawMap[selectedShapeType]) {
        const drawFunction = shapeDrawMap[selectedShapeType];
        drawFunction(ctx, x, y, shapeSize, selectedColor);
    } else {

        console.log('Nenhuma forma selecionada. Clique em um botão de forma primeiro.');
    }
});