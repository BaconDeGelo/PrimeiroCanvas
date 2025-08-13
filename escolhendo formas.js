const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
const shapeBtns = document.querySelectorAll('.shape-btn'); // MODIFICADO: Agora pegamos todos os botões de forma para poder "ouvir" quando você clica neles.


// NOVO: Esta é uma "caixinha de memória" que vai guardar o nome da forma que você escolheu (por exemplo, "quadrado" ou "círculo").
let selectedShapeType = null;


// MODIFICADO: Isso é muito importante! Fazemos o tamanho real da área de desenho do canvas
// ser igual ao tamanho que ele aparece na sua tela. Assim, quando você clica,
// a forma aparece exatamente onde o seu dedo ou mouse está, e não um pouco para o lado!
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;


console.log('Canvas inicializado com dimensões:', canvas.width, 'x', canvas.height);




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


const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'cyan', 'gold', 'brown', 'lime', 'teal'];


clearButton.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}


// NOVO: Aqui, o computador "escuta" cada um dos botões de forma.
shapeBtns.forEach(button => {
    button.addEventListener('click', function() {
        // NOVO: Primeiro, ele tira o "destaque" (a cor diferente) de TODOS os botões.
        shapeBtns.forEach(btn => btn.classList.remove('active'));
        // NOVO: Depois, ele coloca o "destaque" (a cor diferente) SÓ no botão que você acabou de clicar.
        this.classList.add('active');
        // NOVO: E por fim, ele guarda o nome da forma que você clicou (por exemplo, "square" para quadrado)
        // na nossa "caixinha de memória" (selectedShapeType).
        selectedShapeType = this.dataset.shape;
        console.log(`Forma selecionada: ${selectedShapeType}`);
    });
});


// MODIFICADO: Agora, quando você clica na prancheta (canvas), o que acontece é diferente.
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`Você clicou em: X=${x}, Y=${y}`);


    const randomColor = getRandomItem(colors);
    // MODIFICADO: Aumentamos o tamanho das formas para 50, para que fiquem mais fáceis de ver!
    const shapeSize = 50;


    // MODIFICADO: Aqui, o computador verifica duas coisas:
    // 1. Se você já escolheu uma forma (se a "caixinha de memória" selectedShapeType não está vazia).
    // 2. Se ele sabe como desenhar essa forma (se ela existe na nossa "lista de instruções" shapeDrawMap).
    if (selectedShapeType && shapeDrawMap[selectedShapeType]) {
        // Se sim, ele pega a instrução de desenho certa para a forma que você escolheu...
        const drawFunction = shapeDrawMap[selectedShapeType];
        // ...e desenha essa forma no lugar onde você clicou, com uma cor aleatória!
        drawFunction(ctx, x, y, shapeSize, randomColor);
    } else {
        // Se você não escolheu uma forma, ele apenas avisa no console.
        // Assim, você precisa clicar em um dos botões de forma primeiro!
        console.log('Nenhuma forma selecionada. Clique em um botão de forma primeiro.');
    }
});