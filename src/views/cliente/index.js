/*
O código importa três componentes chamados "Home", "Login" e "Termos" de ficheiros específicos. 
Estes componentes representam diferentes páginas da aplicação. Em seguida, o código cria um 
objeto chamado "Clientes" que contém as referências para esses componentes.
Por fim, o objeto "Clientes" é exportado como o valor padrão do módulo, o que significa que, ao 
importar esse módulo noutro lugar, o objeto "Clientes" estará disponível para uso. Isto permite 
que outros módulos acessem os componentes "Home", "Login" e "Termos" através do objeto "Clientes".
*/

// Importação dos componentes "Home", "Login" e "Termos"
import { Home } from "./Home/home";
import Login from "./Login/login";
import Termos from "./Termos/termos";

// Criação de um objeto chamado "Clientes" que contém referências para os componentes importados
const Clientes = { Home, Login, Termos };

// Exportação do objeto "Clientes" como o valor padrão do módulo
export default Clientes;
