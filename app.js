// main.js (ou outro nome que você use como "entry point")
import { app, BrowserWindow } from 'electron';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Converte import.meta.url em caminho de arquivo
const __filename = fileURLToPath(import.meta.url);
// Em seguida, obtemos o diretório
const __dirnameCustom = dirname(__filename);

// Inicia o servidor
import './src/server.js';

function createWindow() {
    const win = new BrowserWindow({
        width: 1080,
        height: 900,
        webPreferences: {
            // Habilita a integração com Node.js, se necessário
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    // Carrega o arquivo HTML do frontend (use join para compatibilidade de caminhos)
    win.loadFile(join(__dirnameCustom, 'public', 'index.html'));
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
