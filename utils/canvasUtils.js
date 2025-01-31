const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Função para gerar a imagem do perfil
async function createProfileImage(username, balance, bank, fundo) {
    const width = 500;
        const height = 300;
            const canvas = createCanvas(width, height);
                const ctx = canvas.getContext('2d');

                    // Carregar imagem de fundo personalizada
                        let backgroundPath = path.join(__dirname, '..', 'perfil', fundo);
                            if (!fs.existsSync(backgroundPath)) {
                                    backgroundPath = path.join(__dirname, '..', 'perfil', 'default.png'); // Fundo padrão
                                        }
                                            const background = await loadImage(backgroundPath);
                                                ctx.drawImage(background, 0, 0, width, height);

                                                    // Adicionar informações do usuário
                                                        ctx.fillStyle = 'white';
                                                            ctx.font = 'bold 24px Arial';
                                                                ctx.fillText(`Usuário: ${username}`, 30, 50);
                                                                    ctx.fillText(`Saldo: 💵 ${balance}`, 30, 100);
                                                                        ctx.fillText(`Banco: 🏦 ${bank}`, 30, 150);

                                                                            return canvas.toBuffer();
                                                                            }

                                                                            module.exports = { createProfileImage };
                                                                            