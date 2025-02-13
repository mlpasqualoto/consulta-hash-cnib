import reqApi from '../../src/controllers/controllers.js';

const loginBtn = document.getElementById("loginBtn");
const submitBtn = document.getElementById("submitBtn");
const loading = document.getElementById("loading");
const searchContainer = document.getElementById("searchContainer");

// Evento de click para obter o token
let tokenExpirationTime = ""; // Armazenará o tempo de expiração do token
let token = "";
loginBtn.addEventListener("click", async () => {
    loading.style.display = "flex"; // Exibe o loading

    try {
        // Requisita o token de acesso com tempo de expiração
        const dataToken = await reqApi.getToken();
        token = dataToken.token;

        // Calcula o tempo de expiração (em milissegundos)
        const expiresIn = dataToken.expires_in * 1000; // Converte segundos para milissegundos
        tokenExpirationTime = Date.now() + expiresIn;
        console.log("Token obtido com sucesso. Expira em:", new Date(tokenExpirationTime).toLocaleTimeString());
    
    } catch (error) {
        console.error("Erro ao obter token:", error);
        return;
    }

    loading.style.display = "none"; // Oculta o loading

    searchContainer.style.display = "flex"; // Exibe o formulário de busca    
});

// Evento de click para buscar o hash
let hash = "";
let indisponivel = "";
let nome = "";
submitBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Impede o envio do formulário

    const cpfUsuario = document.getElementById("cpfUser").value.trim();
    const documento = document.getElementById("cpfSearch").value.trim();

    loading.style.display = "flex"; // Exibe o loading
    
    try {
        // Requisita o hash do documento
        const dataHash = await reqApi.getHash(token, cpfUsuario, documento);
        hash = dataHash.hash;
        indisponivel = dataHash.indisponivel;
        nome = dataHash.nome;

    } catch (error) {
        console.error("Erro ao obter hash:", error);
        return;
    }

    loading.style.display = "none"; // Oculta o loading

    // Exibe o resultado
    const resultName = document.getElementById("resultName");
    resultName.textContent = `Nome: ${nome}`;

    const result = document.getElementById("result");
    result.textContent = `Hash: ${hash} / Indisponível: ${indisponivel}`;
});

// Cria uma caixa de aviso para expiração do token
const showExpirationWarning = () => {
    // Cria o overlay que desfoca o fundo
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // fundo semi-transparente
    overlay.style.backdropFilter = 'blur(5px)'; // aplica o desfoque
    overlay.style.zIndex = '999';

    // Cria a caixa de alerta
    const warning = document.createElement('div');
    warning.id = 'expirationWarning';
    warning.innerHTML = `
        <p>Sua sessão expirou! Por favor, faça login novamente.</p>
        <button onclick="location.reload()">Recarregar</button>
    `;
    warning.style.position = 'fixed';
    warning.style.top = '50%';
    warning.style.left = '50%';
    warning.style.transform = 'translate(-50%, -50%)';
    warning.style.padding = '15px';
    warning.style.background = '#ffebee';
    warning.style.border = '1px solid #ffcdd2';
    warning.style.borderRadius = '5px';
    warning.style.zIndex = '1000';

    // Adiciona os elementos à página
    document.body.appendChild(overlay);
    document.body.appendChild(warning);
};

// Verifica se o token está expirado
const checkTokenExpiration = () => {
    if (!token || !tokenExpirationTime) {
        searchContainer.style.display = "none"; // Esconde se não houver token
        return { expired: true, message: "Token não disponível." };
    }

    const currentTime = Date.now();
    const timeRemaining = tokenExpirationTime - currentTime;
    console.log("Tempo restante:", timeRemaining);

    if (timeRemaining <= 0) {
        searchContainer.style.display = "none"; // Esconde quando expirar
        showExpirationWarning(); // Mostra aviso
        return { expired: true, message: "Token expirado." };
    } else {
        searchContainer.style.display = "flex"; // Mostra se válido
        return { expired: false, message: "Token válido." };
    }
};

// Adicione verificação periódica (a cada 1 segundo)
setInterval(() => {
    checkTokenExpiration();
}, 1000);
