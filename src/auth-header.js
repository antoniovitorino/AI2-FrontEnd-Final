/*
Esta função é útil para adicionar o cabeçalho de autorização nas requisições HTTP. 
Verifica se existe um objeto "user" armazenado no localStorage e se este objeto 
possui a propriedade "token". Se ambos os critérios forem "true", a função retorna 
um objeto contendo o cabeçalho de autorização, utilizando o token no formato "Bearer <token>". 
Caso contrário, retorna um objeto vazio. Esta função pode ser importada e utilizada
noutros módulos para incluir o cabeçalho de autorização nas requisições que exigem autenticação.
*/

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user')); // Obter o objeto "user" armazenado no localStorage e convertê-lo de volta para um objeto JSON

    if (user && user.token) { // Verificar se o objeto "user" existe e se possui a propriedade "token"
        
        return { Authorization: 'Bearer ' + user.token }; // Retornar um objeto com o cabeçalho de autorização contendo o token
        
    } else {
        return {}; // Se o objeto "user" não existe ou não possui o token, retornar um objeto vazio
        
    }
}