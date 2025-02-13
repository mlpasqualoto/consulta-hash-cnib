const reqApi = {
    getToken: async () => {
        try {
            const response = await fetch("http://localhost:5800/connect/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            // Verificação de status
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                console.log(data.message);
                return data;
            } else {
                console.log(data.message);
                return [];
            }
        } catch (error) {
            console.log("Erro na requisição da API interna", error);
            return [];
        }
    },

    getHash: async (token, cpfUsuario, documento) => {
        try {
            const response = await fetch("http://localhost:5800/api/ordem/consultar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token,
                    cpfUsuario: cpfUsuario,
                    documento: documento
                })
            });

            // Verificação de status
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                console.log(data.message);
                return data;
            } else {
                console.log(data.message);
                return [];
            }
        } catch (error) {
            console.log("Erro na requisição da API interna", error);
            return [];
        }
    }
}

export default reqApi;
