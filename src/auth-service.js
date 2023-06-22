/*
Este código define uma classe AuthService que fornece métodos para realizar operações de autenticação, 
como login, logout e obter o utilizador atual. Utiliza a biblioteca axios para fazer uma requisição HTTP POST 
para um endpoint de login na API. Se a resposta da API contém um token, o serviço de autenticação armazena-o 
no localStorage do navegador como "user". O método logout remove esse item do localStorage, enquanto o método 
getCurrentUser recupera o objeto JSON armazenado no localStorage.
*/

import axios from "axios";

class AuthService {
    login(email, password) {
        return axios
            .post("https://jogatanas-api.onrender.com/users/login", {email, password}) // Fazer uma requisição HTTP POST para o endpoint de login da API
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem("user", JSON.stringify(res.data)); // Se a resposta contém um token, armazená-lo no localStorage como "user"
                }
                return res.data;
            }, reason => { throw new Error('Utilizador Inválido'); // Se ocorrer um erro durante a requisição, lançar uma exceção com a mensagem "Utilizador Inválido"
        });
    }

    logout() {
        localStorage.removeItem("user"); // Remover o item "user" do localStorage ao efetuar logout
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user')); // Obter o item "user" do localStorage e convertê-lo de volta para um objeto JSON
    }
}

export default new AuthService(); // Exportar uma instância do AuthService como padrão (export default) para ser utilizada noutros módulos