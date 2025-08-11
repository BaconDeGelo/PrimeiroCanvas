const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
console.log('Tamanho do canvas:', canvas.width, 'x', canvas.height);

const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'cyan', 'gold', 'brown', 'lime', 'teal'];

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

clearButton.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function getRamdomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

const drawFunctions = [
    drawStar,
    drawHexagon,
]

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`X=${x}, Y=${y}`);
    const ramdomColor = getRamdomItem(colors);
    const ramdomDrawFunction = getRamdomItem(drawFunctions);
    const shapeSize = 30;
    ramdomDrawFunction(ctx, x, y, shapeSize, ramdomColor);
});