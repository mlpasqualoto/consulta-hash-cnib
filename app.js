import { app, BrowserWindow } from 'electron';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import './src/server.js' // Inicia o servidor

function createWindow() {
    const win = new BrowserWindow({
        width: 1080,
        height: 900,
        webPreferences: {
        // Habilita a integração com Node.js se necessário
        nodeIntegration: true,
        contextIsolation: false
        }
    });

    // Carrega o arquivo HTML do frontend
    win.loadFile(`${__dirname}/public/index.html`);
}

// Cria a janela quando o aplicativo estiver pronto
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // No macOS é comum recriar a janela quando o ícone é clicado e não há janelas abertas.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Fecha a aplicação quando todas as janelas forem fechadas (exceto no macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
