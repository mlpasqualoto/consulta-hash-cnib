import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const routes = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
        res.json({ message: 'Welcome to the API' });
    });

    app.post('/connect/token', async (req, res) => {
        const client_id = process.env.CLIENT_ID;
        const client_secret = process.env.CLIENT_SECRET;

        // Validação das variáveis de ambiente
        if (!client_id || !client_secret) {
            return res.status(500).json({ success: false, message: 'Variáveis de ambiente não configuradas' });
        }

        try {
            // Formato do corpo usando URLSearchParams
            const body = new URLSearchParams();
            body.append('grant_type', 'client_credentials');
            body.append('client_id', client_id);
            body.append('client_secret', client_secret);
            body.append('scope', 'cnib-serventia-api');

            const response = await fetch("https://auth.id.onr.org.br/connect/token", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body
            });

            // Verificação do status HTTP
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro na API externa:', errorData);
                return res.status(400).json({ 
                    success: false, 
                    message: errorData.error
                });
            }

            const data = await response.json();
            
            console.log(data);
            res.status(200).json({ success: true, message: 'Token gerado com sucesso', token: data.access_token, expires_in: data.expires_in });

        } catch (error) {
            console.log("Erro na API da Indisponibilidade", error);
            res.status(500).json({ success: false, message: 'Erro na API da Indisponibilidade' });
        }
    });

    app.post("/api/ordem/consultar", async (req, res) => {
        const { token, cpfUsuario, documento } = req.body;

        if (!token || !cpfUsuario || !documento) {
            return res.status(400).json({ success: false, message: 'Dados inválidos' });
        }

        try {
            const response = await fetch("https://serventia-api.onr.org.br/api/ordem/consultar", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "cpf_usuario": cpfUsuario,
                    "documento": documento
                })
            });

            // Verificação do status HTTP
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro na API externa:', errorData.message);
                return res.status(400).json({ 
                    success: false, 
                    message: errorData.message
                });
            }

            const data = await response.json();

            // Verifica se o documento é indisponível
            let indisp = "";
            if (data.data.indisponivel) {
                indisp = "Positivo";
            } else {
                indisp = "Negativo";
            }

            console.log(data);
            res.status(200).json({ success: true, message: 'Consulta realizada com sucesso', indisponivel: indisp, hash: data.data.dados_usuario.hash, nome: data.data.nomeRazao });

        } catch (error) {
            console.log("Erro na API da Indisponibilidade", error);
            res.status(500).json({ success: false, message: 'Erro na API da Indisponibilidade' });
        }
    });
}

export default routes;
