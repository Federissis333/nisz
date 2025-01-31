const { createCanvas } = require('canvas');

// Função para gerar uma imagem com o Canvas
function createCanvasImage(width, height, bgColor, text) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Definir a cor de fundo
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Definir a cor do texto
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(text, 20, 50);

    return canvas.toBuffer();
}

module.exports = { createCanvasImage };
